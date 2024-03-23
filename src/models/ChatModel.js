const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
