const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

//// /api/users/

// POST: Signup new user and login
// DELETE: Delete logged in user
router
  .route('/')
  .post(authController.signup)
  .delete(authController.protect, userController.deleteUser);

// POST: Login user
router.post('/login', authController.login);

module.exports = router;
