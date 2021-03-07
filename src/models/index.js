const mongoose = require('mongoose');
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

const connectDb = () => {
  // mongoose.set('debug', true);
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = {
  connectDb, User, Post, Comment
}
