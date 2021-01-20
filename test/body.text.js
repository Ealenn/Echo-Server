const assert = require('assert');
const request = require('supertest');
const bodyText = 'test with body';

process.env.LOGS__LEVEL = "error";

describe('Body with TEXT', function () {
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
      .set('Content-Type', 'text/plain')
      .send(bodyText)
      .expect(function (res) {
        console.log(res.body.request.body)
        assert.strictEqual(res.body.request.body, bodyText)
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .set('Content-Type', 'text/plain')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body, bodyText)
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .set('Content-Type', 'text/plain')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body, bodyText)
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .set('Content-Type', 'text/plain')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body, bodyText)
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .set('Content-Type', 'text/plain')
      .send(bodyText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body, bodyText)
      })
      .expect(200, done);
  });
});