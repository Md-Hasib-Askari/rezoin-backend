const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post' 
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  }
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
