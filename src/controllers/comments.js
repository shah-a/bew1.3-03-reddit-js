const router = require('express').Router({ mergeParams: true });
const { requireAuth } = require('../middleware');
const { Post, User } = require('../models');
const { Comment } = require('../models');

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
