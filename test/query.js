const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Request with Query', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('GET', function test(done) {
    request(server)
      .get('/?test=ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.query.test, 'ok')
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/?test=ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.query.test, 'ok')
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/?test=ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.query.test, 'ok')
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/?test=ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.query.test, 'ok')
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/?test=ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.query.test, 'ok')
      })
      .expect(200, done);
  });
});