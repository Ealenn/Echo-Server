const assert = require('assert');
const request = require('supertest');

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
        assert.equal(seconds < 0.5, true);
      })
      .expect(200, done);
  });
  it('With "A" time', (done) => {
    request(server)
      .get('/?echo_time=a')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.equal(seconds < 0.5, true);
      })
      .expect(200, done);
  });
  it('With 50.000ms', (done) => {
    request(server)
      .get('/?echo_time=50000')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.equal(seconds < 0.5, true);
      })
      .expect(200, done);
  });
  it('With 0.5 seconds in query', (done) => {
    request(server)
      .get('/?echo_time=500')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.equal(seconds > 0.5, true);
      })
      .expect(200, done);
  });
  it('With 0.5 seconds in header', (done) => {
    request(server)
      .get('/')
      .set('ECHO_TIME', '500')
      .expect(function (res) {
        var seconds = (new Date() - time) / 1000;
        assert.equal(seconds > 0.5, true);
      })
      .expect(200, done);
  });
});