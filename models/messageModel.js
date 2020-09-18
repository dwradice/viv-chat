const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Message needs content'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'user',
  },
  room: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'room',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
