const assert = require('assert');
const request = require('supertest');

describe('HTTP Verbs', function () {
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
      .expect(function (res) {
        assert.equal(res.body.http.method, 'GET')
        assert.equal(res.body.http.protocol, 'http')
        assert.equal(res.body.http.originalUrl, '/')
        assert.equal(res.body.http.baseUrl, '')
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .expect(function (res) {
        assert.equal(res.body.http.method, 'POST')
        assert.equal(res.body.http.protocol, 'http')
        assert.equal(res.body.http.originalUrl, '/')
        assert.equal(res.body.http.baseUrl, '')
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .expect(function (res) {
        assert.equal(res.body.http.method, 'PUT')
        assert.equal(res.body.http.protocol, 'http')
        assert.equal(res.body.http.originalUrl, '/')
        assert.equal(res.body.http.baseUrl, '')
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .expect(function (res) {
        assert.equal(res.body.http.method, 'PATCH')
        assert.equal(res.body.http.protocol, 'http')
        assert.equal(res.body.http.originalUrl, '/')
        assert.equal(res.body.http.baseUrl, '')
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .expect(function (res) {
        assert.equal(res.body.http.method, 'DELETE')
        assert.equal(res.body.http.protocol, 'http')
        assert.equal(res.body.http.originalUrl, '/')
        assert.equal(res.body.http.baseUrl, '')
      })
      .expect(200, done);
  });
});