import App from '../src/server';
const supertest = require('supertest');
const request = supertest(App);
import { NO_CONTENT } from 'http-status-codes';
import { ClassInfo,  Student, Subject, Teacher } from '../src/models';

describe('Route to upload and process csv  /api/upload', () => {
  beforeEach(async () => {
    jest.useFakeTimers();
  });
  const filePath = `${__dirname}/data.test.sample.csv`;
  it('should upload the test file',  async() => {
     request.post('/api/upload')
    .attach('data', filePath, { contentType: 'application/octet-stream' })
    .end(function(err, res) {
      if (err) return Promise.reject(err);
      expect(res.status).toBe(NO_CONTENT);
    });
  });
  it('Database should contain 4 student records after successful upload', async () => {
    const totalStudents = await Student.count();
    expect(totalStudents).toBe(4);
  });
  it('Database should contain 3 class records after successful upload', async () => {
    const totalClasses = await ClassInfo.count();
    expect(totalClasses).toBe(3);
  });

  it('Database should contain 4 teacher records after successful upload', async () => {
    const totalTeachers = await Teacher.count();
    expect(totalTeachers).toBe(4);
  });
  it('Database should contain 4 subject records after successful upload', async () => {
    const totalSubjects = await Subject.count();
    expect(totalSubjects).toBe(3);
  });
  afterAll(done => {
    App.close(done);
  });
});


