import App from '../src/server';
const supertest = require('supertest');
const request = supertest(App);
import { OK } from 'http-status-codes';

const filePath = `${__dirname}/data.test.sample.csv`;
describe('Route to get techers\s work load /api/reports/workload', () => {
  beforeAll(async () => {
    request.post('/api/upload')
    .attach('data', filePath, { contentType: 'application/octet-stream' })
    .end(function(err, res) {
      if (err) return Promise.reject(err);
    });
  });

  it('should return teachers work load if the request url is proper', async () => {
    const response = await request.get('/api/reports/workload');
    expect(response.status).toBe(OK);
  });

  it('should return all teachers workload', async () => {
    const response = await request.get('/api/reports/workload');
    expect(Object.keys(response.body).length).toBe(4);
  });

  it('should return an array with 2 subjects for Teacher1', async () => {
    const response = await request.get('/api/reports/workload');
    expect((response.body['Teacher 1']).length).toBe(2);
  });

  it('should return an array with 2 subjects for Teacher1', async () => {
    const response = await request.get('/api/reports/workload');
    expect((response.body['Teacher 1']).length).toBe(2);
  });
    
  it('should return \"numberOfClasses\" as 2  for Teacher 1 for the subject \"MATHS\"', async () => {
    const response = await request.get('/api/reports/workload');
    let subjectInfo = response.body['Teacher 1'].find(sub => sub.subjectCode === 'MATHS')
    expect(subjectInfo.numberOfClasses).toBe(2);
  });
  afterAll(done => {
    App.close(done);
  });
});
