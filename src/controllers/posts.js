const router = require('express').Router();
const comments = require('./comments');
const { requireAuth } = require('../middleware');
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

router.put('/:postId/upvote', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    // if (post.upvotes.includes(res.locals.currentUser._id)) {
      // res.status(400).send({ message: 'Already upvoted' })
    // } else {
      post.upvotes.push(res.locals.currentUser._id);
      post.score = post.score + 1;
      await post.save();
      res.status(200).send({ message: 'upvote worked!' })
    // }
  } catch (err) {
    res.status(400).send({ err });
  }
});

router.put('/:postId/downvote', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    // if (post.downvotes.includes(res.locals.currentUser._id)) {
      // res.status(400).send({ message: 'Already downvoted' })
    // } else {
      post.downvotes.push(res.locals.currentUser._id);
      post.score = post.score - 1;
      await post.save();
      res.status(200).send({ message: 'downvote worked!' })
    // }
  } catch (err) {
    res.status(400).send({ err });
  }
});

module.exports = router;
