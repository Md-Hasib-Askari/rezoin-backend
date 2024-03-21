const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
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
