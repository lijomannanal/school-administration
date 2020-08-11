import App from '../src/server';
const supertest = require('supertest');
const request = supertest(App);
import { OK } from 'http-status-codes';

describe('Route to get techers\s work load /api/reports/workload', () => {
  it('should return teachers work load if the request url is proper', async done => {
    const response = await request.get('/api/reports/workload');
    expect(response.status).toBe(OK);
    done();
  });
});
