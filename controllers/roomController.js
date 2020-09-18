const Room = require('./../models/roomModel');
const User = require('./../models/userModel');

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate('owner');

    res.status(200).json({
      status: 'success',
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { name } = req.body;
    const owner = req.user.id;

    const room = await Room.create({
      owner,
      name,
    });

    const user = await User.findById(req.user.id);

    user.rooms.push(room.id);
    user.save();

    res.status(200).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};

exports.joinRoom = async (req, res, next) => {
  try {
    const roomID = req.params.roomID;
    const room = await Room.findById(roomID);
    if (!room) {
      throw new Error('That room does not exist');
    }

    const user = await User.findById(req.user.id);

    if (!user.rooms.includes(roomID)) {
      user.rooms.push(roomID);
      user.save();
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};
