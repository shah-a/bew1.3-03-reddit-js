const router = require('express').Router();
const { requireAuth } = require('../middleware');
const comments = require('./comments');
const { Post, User } = require('../models');

router.use('/new', requireAuth);
router.use('/:postId/comments', comments);

router.get('/new', (req, res) => {
  return res.render('posts-new');
});

router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId).lean()
    .then(post => {
      res.render('posts-show', { post });
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/new', (req, res) => {
  const post = new Post(req.body);
  post.author = res.locals.currentUser._id;
  post.save()
    .then(post => {
      return User.findById(post.author);
    })
    .then(user => {
      user.posts.unshift(post);
      return user.save()
    })
    .then(user => {
      res.redirect(`/posts/${post._id}`);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
