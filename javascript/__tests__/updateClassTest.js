import App from '../src/server';
const supertest = require('supertest');
const request = supertest(App);
import { ClassInfo } from '../src/models';
import CommonController from '../src/controllers/CommonController';
import { NO_CONTENT, BAD_REQUEST } from 'http-status-codes';

const CLASS_CODE = "test-class-code-1";
const CLASS_NAME = "test-class-name-1"

describe('Route to update class name /api/class/<classCode>', () => {
  beforeAll(async (done) => {
    await CommonController.addClassInfo({classCode:CLASS_CODE, className: CLASS_NAME});
    done();
  });

  it('should update class name if the class code exists', async done => {
    const response = await request.put(`/api/class/${CLASS_CODE}`)
    .send({className: 'test-class-updated'});
    expect(response.status).toBe(NO_CONTENT);
    done();
  });

  it('should return bad request message if the class code does not exist', async done => {
    const response = await request.put(`/api/class/dummycode`)
    .send({className: 'test-class-updated'});
    expect(response.status).toBe(BAD_REQUEST);
    done();
  });

  afterAll(async (done) => {
    await ClassInfo.destroy({where: {classCode: CLASS_CODE}});
    done();
  });

});
