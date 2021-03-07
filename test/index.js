const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const app = require('../src/server');

describe('Site', function () {
  it("Should have home page", function (done) {
    chai.request(app).get('/')
      .end(function (err, res) {
        if (err) done(err)
        res.status.should.equal(200);
        done();
      });
  });
});
