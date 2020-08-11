import Express from 'express';
import { NO_CONTENT, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { convertCsvToJson, formatErrorResponse } from '../utils';

const DataImportController = Express.Router();
import CommonController from './CommonController';
const LOG = new Logger('DataImportController.js');

/**
 * Function to process each rows of csv
 * @function processData
 * @param {Object} item - Contains row data
 */
const processData = async (item) => {
  try {
    const {
      classname, classCode, teacherEmail,
      teacherName, studentName, studentEmail, subjectCode, subjectName, toDelete
    } = item;

    const [ classInfo, teacher, student, subject] = await Promise.all([
      CommonController.addClassInfo(({classCode, className: classname })),
      CommonController.addTeacher(({ teacherEmail, teacherName })),
      CommonController.addStudent(({ studentName, studentEmail })),
      CommonController.addSubject(({ subjectCode, subjectName })),
    ]);
    const [studentClass, teacherSubject] = await Promise.all([
      CommonController.addStudentClass({ student, classInfo}),
      CommonController.addTeacherSubject({ teacher, subject})
    ]);

    if (toDelete === '1') {
      await studentClass.removeTeacherSubject(teacherSubject);
    } else {
      await studentClass.addTeacherSubject(teacherSubject);
    }

  } catch (error) {
    LOG.error(error);
    throw error;
  }
}


/**
 * Function to convert csv to json and process the data
 * @function dataImportHandler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const dataImportHandler = async (req, res) => {
  const { file } = req;
  try {
    const data = await convertCsvToJson(file.path);
    for (const item of data) {
      await processData(item);
    }
    res.sendStatus(NO_CONTENT);
  } catch (err) {
    LOG.error(err)
    res.status(INTERNAL_SERVER_ERROR).send(formatErrorResponse(err.message));
  }
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
