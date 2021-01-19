const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Custom Body with Environment', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('LANG', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-ENV-BODY', 'LANG')
      .expect(function (res) {
        assert.strictEqual(res.body, process.env["LANG"])
      })
      .expect(200, done);
  });
  it('LANG with Query', (done) => {
    request(server)
      .get('/?echo_env_body=LANG')
      .expect(function (res) {
        assert.strictEqual(res.body, process.env["LANG"])
      })
      .expect(200, done);
  });
});