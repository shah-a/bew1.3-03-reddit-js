const router = require('express').Router({ mergeParams: true });
const middleware = require('../middleware');
const Post = require('../models/post');
const Comment = require('../models/comment');

router.post('/', middleware.requireAuth, (req, res) => {
  const comment = new Comment(req.body);
  comment.save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      res.redirect(`/posts/${req.params.postId}`);
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;
