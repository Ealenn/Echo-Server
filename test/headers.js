const assert = require('assert');
const request = require('supertest');

describe('Headers', function () {
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
      .set('test', 'ok')
      .expect(function (res) {
        assert.equal(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.equal(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.equal(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.equal(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.equal(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
});