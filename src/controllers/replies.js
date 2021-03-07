const router = require('express').Router({ mergeParams: true });
const { requireAuth } = require('../middleware');
const { Post, Comment, User } = require('../models');

router.use('/new', requireAuth);

router.get('/new', async (req, res) => {
  let post, comment;
  try {
    post = await Post.findById(req.params.postId).lean()
    comment = await Comment.findById(req.params.commentId).lean()
  } catch (err) {
    console.log(err)
  }
  res.render('replies-new', { post, comment })
});

router.post('/new', async (req, res) => {
  const reply = new Comment(req.body);
  reply.author = res.locals.currentUser._id;
  let comment, user;
  try {
    await reply.save();
    comment = await Comment.findById(req.params.commentId);
    user = await User.findById(reply.author);
    comment.replies.unshift(reply);
    user.comments.unshift(reply);
    console.log('comment:', comment)
    await comment.save();
    await user.save();
    res.redirect(`/posts/${req.params.postId}`);
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
