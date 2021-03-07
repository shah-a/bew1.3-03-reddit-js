const router = require('express').Router({ mergeParams: true });
const replies = require('./replies');
const { requireAuth } = require('../middleware');
const { Post, User, Comment } = require('../models');

router.use('/:commentId/replies', replies);

router.post('/', requireAuth, (req, res) => {
  const comment = new Comment(req.body);
  comment.author = res.locals.currentUser._id;
  comment.save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      return User.findById(comment.author);
    })
    .then(user => {
      user.comments.unshift(comment);
      return user.save();
    })
    .then(user => {
      res.redirect(`/posts/${req.params.postId}`);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
