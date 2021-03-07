const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const app = require('../src/server');
const { User } = require('../src/models');

describe('Auth', function () {
  const agent = chai.request.agent(app);
  const objectId = 'aaaaaaaaaaaa'  // Sample 12-byte ObjectID
  const invalidAccount = {
    username: 'does_not_exist',
    password: 'nope'
  };
  const testAccount = {
    username: 'testing_user',
    password: 'testing_pass',
    _id: 'aaaaaaaaaaaa'
  };

  after(function (done) {
    agent.close();
    User.deleteOne({ _id: objectId }, (err, result) => {
      if (err) done(err);
      console.log('User.deleteOne: ', result);
      done();
    });
  });

  it("Should not login unless signed up", function (done) {
    agent.post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(invalidAccount)
      .end(function (err, res) {
        if (err) done(err);
        res.status.should.equal(401);
        done();
      });
  });

  it("Should sign a user up", function (done) {
    agent.post('/sign-up')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(testAccount)
      .end(function (err, res) {
        if (err) done(err);
        res.status.should.equal(200);
        agent.should.have.cookie('nToken');
        done()
      });
  });

  it("Should login with valid account", function (done) {
    agent.post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(testAccount)
      .end(function (err, res) {
        if (err) done(err);
        res.status.should.equal(200);
        agent.should.have.cookie('nToken');
        done();
      });
  });
});
