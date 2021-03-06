const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.get('/login', (req, res) => {
  return res.send('works');
});

router.get('/logout', (req, res) => {
  return res.send('works');
});

router.post('/sign-up', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(user => {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
});

module.exports = router;
