import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import Logger from '../config/logger';
import { sortAlphaNum, formatErrorResponse } from '../utils';
import axios from 'axios';
import * as Joi from 'joi';

import CommonController from './CommonController';
const LOG = new Logger('FetchStudentsController.js');

const schema = Joi.object().options({ abortEarly: false }).keys({
  classCode: Joi.string().regex(/^[a-zA-Z0-9-]+$/) .required(),
  offset: Joi.number().min(0).max(500).required(),
  limit: Joi.number().min(1).max(500).required(),
});

/**
 * Function to external students
 * @async
 * @function getExternalStudents
 * @param {string} classCode - Class code to query for students
 * @param {number} offset - Number of records to ignore before returning the first record.
 * @param {number} limit - Number of  records to retrieve.
 * @return {Promise<Object>} The data with external students total count and array of students.
 * */
const getExternalStudents =  async (classCode, limit ) => {
  try {
    return  axios.get(`http://localhost:${process.env.EXTERNAL_STUDENTS_PORT}/students?class=${classCode}&offset=0&limit=${limit}`);
  } catch (error) {
    LOG.error(error);
    throw error;
  }
}

/**
 * Function to fetch  students by classcode
 * @function fetchStudentsHandler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} result - Output object .
 * @returns {number} result.count - Total number of students.
 * @returns {Array} result.students - List of students with id, name and email.
 */
const fetchStudentsHandler = async (req, res) => {
  try {
    let { offset, limit } = req.query;
    const { classCode } = req.params
    offset = parseInt(offset);
    limit = parseInt(limit);
    const validator =  schema.validate({ classCode, offset, limit  });
    if (validator.error) {
      let message = validator.error.details.reduce((message, error)  => `${message}${error.message} ,` , '');
      return res.status(BAD_REQUEST).json(formatErrorResponse(message));
    }
    const [ externalStudentsInfo, students ] = await Promise.all([
      getExternalStudents(classCode, offset + limit ),
      CommonController.getClassStudents(classCode, offset + limit)
    ]);
    LOG.info(`students from db ${JSON.stringify(students)}`);
    LOG.info(`external students ${JSON.stringify(externalStudentsInfo.data)}`);
    let totalCount = 0;
    let externalStudents = [];

    if (externalStudentsInfo && externalStudentsInfo.data) {
      totalCount = totalCount +  (externalStudentsInfo.data.count || 0 );
      externalStudents = [...externalStudentsInfo.data.students];
    }
    totalCount += students.count;
    let studentsInfo = [...students.rows];
    const allStudents = [...externalStudents, ...studentsInfo].sort(sortAlphaNum('name')).slice(offset, limit);
    res.json({count: totalCount, students: allStudents});
  } catch (err) {
    LOG.error(err)
    res.status(INTERNAL_SERVER_ERROR).send(formatErrorResponse(err.message));
  }
}


export default fetchStudentsHandler;
