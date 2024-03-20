const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
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
});

const ReactionModel = mongoose.model('Reaction', reactionSchema);

module.exports = ReactionModel;
