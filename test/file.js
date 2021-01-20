const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('File', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('GET 404 with Query', (done) => {
    request(server)
      .get('/?echo_file=/not_an_directory')
      .expect(404, done);
  });
  it('GET 404 with Header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-FILE', '/not_an_directory')
      .expect(404, done);
  });
  it('GET 200 with Query', (done) => {
    request(server)
      .get('/?echo_file=/')
      .expect(200, done);
  });
  it('GET 200 with Header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-FILE', '/')
      .expect(200, done);
  });
});