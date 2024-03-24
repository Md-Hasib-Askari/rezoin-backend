const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  reactionCount: {
    type: Number,
    default: 0,
    required: true
  },
  commentCount: {
      type: Number,
      default: 0,
      required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  }
}, {timestamps: true, versionKey: false});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
