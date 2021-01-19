const assert = require('assert');
const request = require('supertest');
const bodyText = {
  test: "with json"
};

process.env.LOGS__LEVEL = "error";

describe('Body with JSON', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('GET', function test(done) {
    request(server)
      .get('/')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.test, bodyText.test)
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.test, bodyText.test)
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.test, bodyText.test)
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.test, bodyText.test)
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.test, bodyText.test)
      })
      .expect(200, done);
  });
});