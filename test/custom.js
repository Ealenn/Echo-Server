const assert = require('assert');
const request = require('supertest');

describe('Custom Body & Code', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('Code and Body with Header', (done) => {
    request(server)
      .get('/')
      .set('ECHO_BODY', 'Oups')
      .set('ECHO_CODE', 401)
      .expect(function (res) {
        assert.equal(res.body, "Oups")
      })
      .expect(401, done);
  });
  it('Code and Body with Query', (done) => {
    request(server)
      .get('/?echo_body=Oups&echo_code=401')
      .expect(function (res) {
        assert.equal(res.body, "Oups")
      })
      .expect(401, done);
  });
  it('Code and Env Body with Header', (done) => {
    request(server)
      .get('/')
      .set('ECHO_ENV_BODY', 'HOME')
      .set('ECHO_CODE', 401)
      .expect(function (res) {
        assert.equal(res.body, process.env["HOME"])
      })
      .expect(401, done);
  });
  it('Code and Env Body with Query', (done) => {
    request(server)
      .get('/?echo_env_body=HOME&echo_code=401')
      .expect(function (res) {
        assert.equal(res.body, process.env["HOME"])
      })
      .expect(401, done);
  });
});