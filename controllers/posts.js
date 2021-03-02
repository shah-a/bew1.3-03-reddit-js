const Post = require('../models/post');

module.exports = (app) => {
  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        res.render('posts-index', { posts });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).lean()
      .then(post => {
        res.render('posts-show', { post });
      })
      .catch(err => {
        console.log(err.message);
      })
  });

  // Create
  app.post('/posts/new', (req, res) => {
    // Init an instance of Post model
    const post = new Post(req.body);

    // Save instance of post model to DB
    post.save((err, post) => {
      // Redirect to the root
      return res.redirect('/');
    });
  });
};
