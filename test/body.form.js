const assert = require('assert');
const request = require('supertest');
const fieldText = 'test with field';

process.env.LOGS__LEVEL = "error";

describe('Body with FORM', function () {
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
      .field('text', fieldText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.text, fieldText)
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .field('text', fieldText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.text, fieldText)
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .field('text', fieldText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.text, fieldText)
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .field('text', fieldText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.text, fieldText)
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .field('text', fieldText)
      .expect(function (res) {
        assert.strictEqual(res.body.request.body.text, fieldText)
      })
      .expect(200, done);
  });
});