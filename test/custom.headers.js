const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Custom Headers', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('Simple Header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-HEADER', 'Accept-Language: en-US')
      .expect(function (res) {
        assert.strictEqual(res.header['accept-language'], 'en-US')
      })
      .expect(200, done);
  });
  it('Complexe Header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-HEADER', 'Host: en.echo-server.local:3000')
      .expect(function (res) {
        assert.strictEqual(res.header['host'], 'en.echo-server.local:3000')
      })
      .expect(200, done);
  });
  it('Multiple Headers', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-HEADER', 'One: 1, Two: 2')
      .expect(function (res) {
        assert.strictEqual(res.header['one'], '1')
        assert.strictEqual(res.header['two'], '2')
      })
      .expect(200, done);
  });
  it('Simple Query', (done) => {
    request(server)
      .get('/?echo_header=Accept-Language: en-US')
      .expect(function (res) {
        assert.strictEqual(res.header['accept-language'], 'en-US')
      })
      .expect(200, done);
  });
  it('Complexe Query', (done) => {
    request(server)
      .get('/?echo_header=One:1, Two:2')
      .expect(function (res) {
        assert.strictEqual(res.header['one'], '1')
        assert.strictEqual(res.header['two'], '2')
      })
      .expect(200, done);
  });
});