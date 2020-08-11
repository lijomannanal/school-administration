import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../config/logger';
import { formatErrorResponse } from '../utils';
import { uniqBy } from 'lodash';

import CommonController from './CommonController';
const LOG = new Logger('FetchWorkLoadReportController.js');


/**
 * Function to update class name by class code
 * @function fetchWorkLoadHandler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const fetchWorkLoadHandler = async (req, res) => {
  try {
    const result = await CommonController.getTeacherClasses();
    let workLoad = {};
    for(const item of result) {
      let subjectArray = [];
      for(const data of item.tsubjects) {
        const classes = uniqBy(data.studentClasses, 'class_id');
        const subject = data.subject.toJSON();
        subjectArray.push({ ...subject, numberOfClasses: classes.length });
      }
      workLoad[item.teacherName] = subjectArray;
    }
    res.send(workLoad);
  } catch (err) {
    LOG.error(err)
    res.status(INTERNAL_SERVER_ERROR).send(formatErrorResponse(err.message));
  }
}


export default fetchWorkLoadHandler;
