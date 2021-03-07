const router = require('express').Router();
const { Post } = require('../models');

router.get('/:subreddit', (req, res) => {
  Post.find({ subreddit: req.params.subreddit }).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err);
    })
});

module.exports = router;
