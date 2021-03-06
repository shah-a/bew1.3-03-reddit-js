require('dotenv').config();

const mongoose = require('mongoose');
assert = require('assert');

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.URL,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  },
  function (err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to database");
    // db.close();  // turn on for testing
  }
);

mongoose.connection.on('error', console.error.bind(console, "MongoDB connection error: "));
mongoose.set('debug', true);

module.exports = mongoose.connection;
