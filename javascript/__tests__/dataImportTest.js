import App from '../src/server';
const supertest = require('supertest');
const request = supertest(App);
import { NO_CONTENT } from 'http-status-codes';

describe('Route to upload and process csv  /api/upload', () => {
  const filePath = `${__dirname}/data.test.sample.csv`;
  it('should upload the test file', async done => {
     request.post('/api/upload')
    .attach('data', filePath, { contentType: 'application/octet-stream' })
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.status).toBe(NO_CONTENT);
      done();
    });
  });
});


