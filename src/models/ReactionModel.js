const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  isLiked: {
    type: Boolean,
    default: false,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post' 
  }
}, {timestamps: true, versionKey: false});

const ReactionModel = mongoose.model('Reaction', reactionSchema);

module.exports = ReactionModel;
