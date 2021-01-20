const assert = require('assert');
const request = require('supertest');

process.env.LOGS__LEVEL = "error";

describe('Custom Body', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it('Text with Header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-BODY', 'Example text')
      .expect(function (res) {
        assert.strictEqual(res.body, "Example text")
      })
      .expect(200, done);
  });
  it('Json with Header', (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-BODY', '{"example": "json"}')
      .expect(function (res) {
        assert.strictEqual(res.body.example, "json")
      })
      .expect(200, done);
  });
  it('Text with Query', (done) => {
    request(server)
      .get('/?echo_body=Example text')
      .expect(function (res) {
        assert.strictEqual(res.body, "Example text")
      })
      .expect(200, done);
  });
  it('Json with Query', (done) => {
    request(server)
      .get('/?echo_body={"example": "json"}')
      .expect(function (res) {
        assert.strictEqual(res.body.example, "json")
      })
      .expect(200, done);
  });
});