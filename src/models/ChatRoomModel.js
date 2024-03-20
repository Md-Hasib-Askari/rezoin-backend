const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Chat' 
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const ChatRoomModel = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoomModel;
