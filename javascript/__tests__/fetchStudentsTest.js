import App from '../src/server';
const supertest = require('supertest');
const request = supertest(App);
import { OK, BAD_REQUEST } from 'http-status-codes';

describe('Route to get all students /api/class/P1/students', () => {
  const filePath = `${__dirname}/data.test.sample.csv`;
  beforeAll(async () => {
    request.post('/api/upload')
    .attach('data', filePath, { contentType: 'application/octet-stream' })
    .end(function(err, res) {
      if (err) return Promise.reject(err);
    });
  });
  it('should return error if the request doesn\'t contain limit', async done => {
    const response = await request.get('/api/class/P1/students?offset=0');
    expect(response.status).toBe(BAD_REQUEST);
    done();
  });

  it('should return error if the request doesn\'t contain offset', async done => {
    const response = await request.get('/api/class/P1/students?limit=15');
    expect(response.status).toBe(BAD_REQUEST);
    done();
  });

  it('should return error if the request doesn\'t contain valid classCode', async done => {
    const response = await request.get(`/api/class/""/students?offset=0&limit=15`);
    expect(response.status).toBe(BAD_REQUEST);
    done();
  });

  it('should return return students array if the parametera are proper', async done => {
    const response = await request.get('/api/class/P1/students?offset=0&limit=15');
    expect(response.status).toBe(OK)
    done();
  });
  afterAll(done => {
    App.close(done);
  });
});
