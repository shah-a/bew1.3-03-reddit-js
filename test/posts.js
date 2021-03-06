const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../src/server');
const Post = require('../src/models/post');

describe('Posts', function () {
  const agent = chai.request.agent(app);
  let initialDocCount = undefined;
  const newPost = {
    title: 'unique title for testing',
    url: 'https://www.google.ca',
    summary: 'unique summary for testing',
    subreddit: 'unique subreddit for testing'
  };

  before(function (done) {
    Post.estimatedDocumentCount()
      .then(count => {
        initialDocCount = count;
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  after(function (done) {
    agent.close();
    Post.deleteMany(newPost)
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      });
  });

  it("Should create with valid attributes at POST /posts/new", function (done) {
    agent
      .post('/posts/new')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newPost)
      .end(function (err, res) {
        if (err) done(err);
        Post.estimatedDocumentCount()
          .then(newDocCount => {
            expect(res).to.have.status(200);
            expect(newDocCount).to.equal(initialDocCount + 1);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});
