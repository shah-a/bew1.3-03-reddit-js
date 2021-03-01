const Post = require('../models/post');

module.exports = (app) => {
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
