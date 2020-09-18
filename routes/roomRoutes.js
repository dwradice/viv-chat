const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController');
const roomController = require('./../controllers/roomController');

//// /api/rooms/
router.use(authController.protect);

// GET: Gets all rooms
// POST: Create room and join
router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

// PATCH: Join Room
router.route('/:roomID').patch(roomController.joinRoom);

module.exports = router;
