const router = require('express').Router({ mergeParams: true });
const { requireAuth } = require('../middleware');
const { Post, Comment } = require('../models');

router.use('/new', requireAuth);

router.get('/new', (req, res) => {
  res.json({ message: 'GET route working' })
});

router.post('/new', (req, res) => {
  res.json({ message: 'POST route working' })
});

module.exports = router;
