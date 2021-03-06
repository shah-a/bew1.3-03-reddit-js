const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
});

router.post('/sign-up', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(user => {
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username }, ['username', 'password'])
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: `User '${username}' does not exist` });
      }
      user.comparePassword(password, (isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    })
    .catch(err => {
      console.log(err.message);
    })
});

module.exports = router;
