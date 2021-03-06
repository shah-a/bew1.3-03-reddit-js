const router = require('express').Router();
const Post = require('../models/post');

router.get('/new', (req, res) => {
  return res.render('posts-new');
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id).lean()
    .then(post => {
      res.render('posts-show', { post });
    })
    .catch(err => {
      console.log(err.message);
    })
});

router.post('/new', (req, res) => {
  const post = new Post(req.body);
  post.save((err, post) => {
    return res.redirect('/');
  });
});

module.exports = router;
