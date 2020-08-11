import { NO_CONTENT, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import Logger from '../config/logger';
import { formatErrorResponse } from '../utils';
import * as Joi from 'joi';

import CommonController from './CommonController';
const LOG = new Logger('UpdateClassController.js');

const schema = Joi.object().options({ abortEarly: false }).keys({
  className: Joi.string().trim().empty().min(3).max(100).regex(/^[a-zA-Z0-9- ]+$/).required()
});


/**
 * Function to update class name by class code
 * @function updateClassNameHandler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateClassNameHandler = async (req, res) => {
  try {
    const validator =  schema.validate(req.body);
    if (validator.error) {
      let message = validator.error.details.reduce((message, error)  => `${message}${error.message} ,` , '');
      return res.status(BAD_REQUEST).json(formatErrorResponse(message));
    }
    const { classCode } = req.params;
    const { className } = req.body;
    if (!await CommonController.addClassInfo({classCode, className}, false)) {
      return res.status(BAD_REQUEST).json(formatErrorResponse(`Class with this class code (${req.params.classCode}) does not exist`));
    }
    return res.sendStatus(NO_CONTENT);
  } catch (err) {
    LOG.error(err)
    res.status(INTERNAL_SERVER_ERROR).send(formatErrorResponse(err.message));
  }
}


export default updateClassNameHandler;
