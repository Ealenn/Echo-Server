const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Headers', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('GET (cookie)', function test(done) {
    request(server)
      .get('/')
      .set('cookie', 'key=value')
      .expect(function (res) {
        assert.strictEqual(res.body.request.headers['cookie'], 'key=value')
      })
      .expect(200, done);
  });
  it('GET', function test(done) {
    request(server)
      .get('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .set('test', 'ok')
      .expect(function (res) {
        assert.strictEqual(res.body.request.headers['test'], 'ok')
      })
      .expect(200, done);
  });
});

describe('Headers', function () {
  var server;
  beforeEach(function () {
    require('../src/nconf').set('enable:cookies', false);
    server = require('../src/app');
  });
  afterEach(function () {
    require('../src/nconf').set('enable:cookies', true);
    server.close();
  });
  it('GET', function test(done) {
    request(server)
      .get('/')
      .set('cookie', 'key=value')
      .expect(function (res) {
        assert.deepEqual(res.body.request.headers['cookie'], undefined)
      })
      .expect(200, done);
  });
});
