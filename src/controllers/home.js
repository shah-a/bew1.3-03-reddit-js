const router = require('express').Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
  Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;
