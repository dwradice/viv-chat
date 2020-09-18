const Message = require('./../models/messageModel');
const Room = require('../models/roomModel');

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().populate('author');

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};

exports.getRoomMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ room: req.params.roomID }).populate(
      'author'
    );

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const roomID = req.params.roomID;
    const author = req.user.id;

    const room = await Room.findById(roomID);

    if (!room) {
      throw new Error('That room does not exist');
    }

    const message = await Message.create({
      content,
      room: roomID,
      author,
    });

    res.status(201).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};
