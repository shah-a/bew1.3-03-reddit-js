const router = require('express').Router();
const middleware = require('../middleware');
const comments = require('./comments');
const Post = require('../models/post');

router.use('/new', middleware.requireAuth);
router.use('/:postId/comments', comments);

router.get('/new', (req, res) => {
  return res.render('posts-new');
});

router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId).populate('comments').lean()
    .then(post => {
      res.render('posts-show', { post });
    })
    .catch(err => {
      console.log(err.message);
    })
});

router.post('/new', (req, res) => {
  const post = new Post(req.body);
  post.save()
    .then(post => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;
