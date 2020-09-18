const express = require('express');
const router = express.Router();

const messageController = require('./../controllers/messageController');
const authController = require('./../controllers/authController');

//// /api/messages/

// GET: Get All Messages
router.route('/').get(messageController.getAllMessages);

// POST: Send Message
router
  .route('/:roomID')
  .get(authController.protect, messageController.getRoomMessages)
  .post(authController.protect, messageController.sendMessage);

module.exports = router;
