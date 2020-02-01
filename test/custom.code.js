const request = require('supertest');

describe('Custom HTTP Code', function () {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });
  it("Default 200", (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it("Custom 200", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 200)
      .expect(200, done);
  });
  it("Custom 200 with Query", (done) => {
    request(server)
      .get('/?echo_code=200')
      .expect(200, done);
  });
  it("Custom 201", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 201)
      .expect(201, done);
  });
  it("Custom 201 with Query", (done) => {
    request(server)
      .get('/?echo_code=201')
      .expect(201, done);
  });
  it("Custom 300", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 300)
      .expect(300, done);
  });
  it("Custom 300 with Query", (done) => {
    request(server)
      .get('/?echo_code=300')
      .expect(300, done);
  });
  it("Custom 400", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 400)
      .expect(400, done);
  });
  it("Custom 400 with Query", (done) => {
    request(server)
      .get('/?echo_code=400')
      .expect(400, done);
  });
  it("Custom 401", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 401)
      .expect(401, done);
  });
  it("Custom 401 with Query", (done) => {
    request(server)
      .get('/?echo_code=401')
      .expect(401, done);
  });
  it("Custom 404", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 404)
      .expect(404, done);
  });
  it("Custom 404 with Query", (done) => {
    request(server)
      .get('/?echo_code=404')
      .expect(404, done);
  });
  it("Custom 500", (done) => {
    request(server)
      .get('/')
      .set('ECHO_CODE', 500)
      .expect(500, done);
  });
  it("Custom 500 with Query", (done) => {
    request(server)
      .get('/?echo_code=500')
      .expect(500, done);
  });
});