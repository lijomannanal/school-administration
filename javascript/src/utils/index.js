import fs from 'fs';
import csv from 'csv-parser';

export const convertCsvToJson = (filePath) => {
  const results = [];
  const stream = fs.createReadStream(filePath).pipe(csv());

  return new Promise((resolve, reject) => {
    stream.on('data', (data) => results.push(data));
    stream.on('end', () => resolve(results));
    stream.on('error', (err) => reject(err));
  });
}
export const sortAlphaNum = prop => (a, b) => a[prop].localeCompare(b[prop], 'en', { numeric: true });
export const formatErrorResponse =  (errorMessage) => {
  return { status: 'error', message: errorMessage}
}
