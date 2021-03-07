const mongoose = require('mongoose');
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

const connectDb = () => {
  // mongoose.set('debug', true);
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

const seedDb = () => {
  return "Not Implemented Yet"
}

module.exports = {
  connectDb, seedDb, User, Post, Comment
}
