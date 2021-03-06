const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  console.log("Verifying auth...");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    // req.user = null;
    res.locals.currentUser = null;
  } else {
    const token = req.cookies.nToken;
    // const decodedToken = jwt.verify(token, process.env.SECRET, { complete: true });
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    // req.user = decodedToken.payload;
    res.locals.currentUser = decodedToken.payload;
  }
  next();
};

const requireAuth = (req, res, next) => {
  console.log("Requiring auth...");
  if (!res.locals.currentUser) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  next();
};

module.exports = {
  checkAuth, requireAuth
}
