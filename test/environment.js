const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Environment', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('Equal', (done) => {
    request(server)
      .get('/')
      .expect(function (res) {
        assert.strictEqual(res.body.environment[0], process.env[0])
      })
      .expect(200, done);
  });
});