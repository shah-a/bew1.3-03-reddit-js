const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const app = require('../src/server');
const { Post, User } = require('../src/models');

describe('Posts', function () {
  const agent = chai.request.agent(app);
  const objectId = 'aaaaaaaaaaaa'  // Sample 12-byte ObjectID
  let initialDocCount = undefined;
  const testAccount = {
    username: 'testing_user',
    password: 'testing_pass',
    _id: objectId
  };
  const newPost = {
    title: 'A testing title',
    url: 'http://localhost:3000/',
    summary: 'A testing summary',
    subreddit: 'test_sub',
    _id: objectId
  };

  before(function (done) {
    const user = new User(testAccount);
    user.save((err, result) => {
      if (err) done(err);
      done();
    })
  });

  before(function (done) {
    agent.post('/login')
      .send(testAccount)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  before(function (done) {
    Post.estimatedDocumentCount((err, count) => {
      if (err) done(err);
      initialDocCount = count;
      done();
    });
  });

  after(function (done) {
    agent.close();
    done();
  });

  after(function (done) {
    User.deleteOne({ _id: objectId }, (err, result) => {
      if (err) done(err);
      console.log('User.deleteOne: ', result);
      done();
    })
  });

  after(function (done) {
    Post.deleteOne(newPost, (err, result) => {
      if (err) done(err);
      console.log('Post.deleteOne: ', result);
      done();
    })
  });

  it("Should make a new post", function (done) {
    agent.post('/posts/new')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newPost)
      .end(function (err, res) {
        if (err) done(err);
        Post.estimatedDocumentCount((err, newDocCount) => {
          if (err) done();
          res.should.have.status(200);
          newDocCount.should.equal(initialDocCount + 1);
          done();
        })
      });
  });
});
