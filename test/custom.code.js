const request = require('supertest');
const assert = require('assert');

process.env.LOGS__LEVEL = "error";

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
      .set('X-ECHO-CODE', 200)
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
      .set('X-ECHO-CODE', 201)
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
      .set('X-ECHO-CODE', 300)
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
      .set('X-ECHO-CODE', 400)
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
      .set('X-ECHO-CODE', 401)
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
      .set('X-ECHO-CODE', 404)
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
      .set('X-ECHO-CODE', 500)
      .expect(500, done);
  });
  it("Custom 500 with Query", (done) => {
    request(server)
      .get('/?echo_code=500')
      .expect(500, done);
  });
  for (let a=200;a<203;a++){
    for (let b=400;b<403;b++){
      it(`Custom rand status ${a} or ${b} with header`, (done) => {
        request(server)
        .get('/')
        .set('X-ECHO-CODE', `${a}-${b}`)
        .end((err, res) => {
          assert.strictEqual(true, res.status == a || res.status == b);
          assert.strictEqual(res.header['x-echo-random-status'], `${a}, ${b}`);
          done();
        })
      });
    }
  }
  for (let a=200;a<202;a++){
    for (let b=300;b<302;b++){
      for (let c=400;c<402;c++){
        it(`Custom rand status ${a}, ${b}, ${c} with header`, (done) => {
          request(server)
          .get('/')
          .set('X-ECHO-CODE', `${a}-${b}-${c}`)
          .end((err, res) => {
            assert.strictEqual(true, res.status == a || res.status == b || res.status == c);
            assert.strictEqual(res.header['x-echo-random-status'], `${a}, ${b}, ${c}`);
            done();
          })
        });
      }
    }
  }
  for (let a=200;a<203;a++){
    for (let b=400;b<403;b++){
      it(`Custom rand status ${a} or ${b} with query`, (done) => {
        request(server)
        .get('/?echo_code='+`${a}-${b}`)
        .end((err, res) => {
          assert.strictEqual(true, res.status == a || res.status == b);
          assert.strictEqual(res.header['x-echo-random-status'], `${a}, ${b}`);
          done();
        })
      });
    }
  }
  for (let a=200;a<202;a++){
    for (let b=300;b<302;b++){
      for (let c=400;c<402;c++){
        it(`Custom rand status ${a}, ${b}, ${c} with query`, (done) => {
          request(server)
          .get('/?echo_code='+`${a}-${b}-${c}`)
          .end((err, res) => {
            assert.strictEqual(true, res.status == a || res.status == b || res.status == c);
            assert.strictEqual(res.header['x-echo-random-status'], `${a}, ${b}, ${c}`);
            done();
          })
        });
      }
    }
  }
  it("Custom with null separator", (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-CODE', "200.401")
      .end((err, res) => {
        assert.strictEqual(200, res.status);
        assert.strictEqual(res.header['x-echo-random-status'], undefined);
        done();
      })
  });
  it("Custom with null args in Query", (done) => {
    request(server)
      .get('/?echo_code=200/404')
      .end((err, res) => {
        assert.strictEqual(200, res.status);
        assert.strictEqual(res.header['x-echo-random-status'], undefined);
        done();
      })
  });
  it("Custom with null separator but correct value", (done) => {
    request(server)
      .get('/')
      .set('X-ECHO-CODE', "200.401-401")
      .end((err, res) => {
        assert.strictEqual(401, res.status);
        assert.strictEqual(res.header['x-echo-random-status'], '401');
        done();
      })
  });
  it("Custom with null separator but correct value", (done) => {
    request(server)
      .get('/?echo_code=200.401-404')
      .end((err, res) => {
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.header['x-echo-random-status'], '404');
        done();
      });
  });
});