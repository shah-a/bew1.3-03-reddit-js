const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.cookies.nToken;
  if (typeof token === 'undefined' || token === null) {
    res.locals.currentUser = null;
  } else {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) { res.locals.currentUser = null } else {
        res.locals.currentUser = decodedToken;
      };
    });
  }
  next();
};

const requireAuth = (req, res, next) => {
  if (!res.locals.currentUser) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  next();
};

module.exports = {
  checkAuth, requireAuth
}
