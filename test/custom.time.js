const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Custom Body', function () {
  var server;
  var time;
  beforeEach(function () {
    server = require('../src/app');
    time = new Date();
  });
  afterEach(function () {
    server.close();
  });
  it('Without time', (done) => {
    request(server)
      .get('/')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.strictEqual(seconds < 0.5, true);
      })
      .expect(200, done);
  });
  it('With "A" time', (done) => {
    request(server)
      .get('/?echo_time=a')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.strictEqual(seconds < 0.5, true);
      })
      .expect(200, done);
  });
  it('With 1 second in query', (done) => {
    request(server)
      .get('/?echo_time=1000')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.strictEqual(seconds >= 1, true);
      })
      .expect(200, done);
  });
  it('With 500ms second in query', (done) => {
    request(server)
      .get('/?echo_time=500')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.strictEqual(seconds >= 0.5, true);
      })
      .expect(200, done);
  });
  it('With 1 second in header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-TIME', '1000')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.strictEqual(seconds >= 1, true);
      })
      .expect(200, done);
  });
  it('With 500ms second in header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-TIME', '500')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.strictEqual(seconds >= 0.5, true);
      })
      .expect(200, done);
  });
});