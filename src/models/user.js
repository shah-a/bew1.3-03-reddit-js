const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, select: false }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) next();
  bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(this.password, salt)
    })
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      console.log(err.message);
    });
});

UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password)
    .then(result => {
      done(result);
    })
    .catch(err => {
      console.log(err.message);
    });
}

const model = mongoose.model('User', UserSchema);

module.exports = model;
