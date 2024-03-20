const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  }
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
