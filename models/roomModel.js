const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room must have a name'],
    unique: [true, 'A room with that name already exists'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
