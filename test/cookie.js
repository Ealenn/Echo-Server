const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Request with Cookies', function () {
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
      .set('Cookie', ['testOne=valueOne;testTwo=valueTwo'])
      .send()
      .expect(function (res) {
        assert.strictEqual(res.body.request.cookies.testOne, 'valueOne')
        assert.strictEqual(res.body.request.cookies.testTwo, 'valueTwo')
      })
      .expect(200, done);
  });
  it('POST', function test(done) {
    request(server)
      .post('/')
      .set('Cookie', ['testOne=valueOne;testTwo=valueTwo'])
      .send()
      .expect(function (res) {
        assert.strictEqual(res.body.request.cookies.testOne, 'valueOne')
        assert.strictEqual(res.body.request.cookies.testTwo, 'valueTwo')
      })
      .expect(200, done);
  });
  it('PUT', function test(done) {
    request(server)
      .put('/')
      .set('Cookie', ['testOne=valueOne;testTwo=valueTwo'])
      .send()
      .expect(function (res) {
        assert.strictEqual(res.body.request.cookies.testOne, 'valueOne')
        assert.strictEqual(res.body.request.cookies.testTwo, 'valueTwo')
      })
      .expect(200, done);
  });
  it('PATCH', function test(done) {
    request(server)
      .patch('/')
      .set('Cookie', ['testOne=valueOne;testTwo=valueTwo'])
      .send()
      .expect(function (res) {
        assert.strictEqual(res.body.request.cookies.testOne, 'valueOne')
        assert.strictEqual(res.body.request.cookies.testTwo, 'valueTwo')
      })
      .expect(200, done);
  });
  it('DELETE', function test(done) {
    request(server)
      .delete('/')
      .set('Cookie', ['testOne=valueOne;testTwo=valueTwo'])
      .send()
      .expect(function (res) {
        assert.strictEqual(res.body.request.cookies.testOne, 'valueOne')
        assert.strictEqual(res.body.request.cookies.testTwo, 'valueTwo')
      })
      .expect(200, done);
  });
});

describe('Request with Cookies but disabled in configuration', function () {
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
      .set('Cookie', ['testOne=valueOne;testTwo=valueTwo'])
      .send()
      .expect(function (res) {
        assert.deepEqual(res.body.request.cookies, []);
      })
      .expect(200, done);
  });
});
