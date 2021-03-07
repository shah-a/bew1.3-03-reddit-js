const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

CommentSchema.pre('find', function (next) {
  this.populate('author');
  next()
});

CommentSchema.pre('findOne', function (next) {
  this.populate('author');
  next()
});

const model = mongoose.model('Comment', CommentSchema);

module.exports = model;
