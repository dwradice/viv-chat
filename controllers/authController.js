const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

// JWT
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove Password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Authenticates logged in user
exports.protect = async (req, res, next) => {
  try {
    // Get token from cookies
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      throw new Error('You need to be logged in to access this page');
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw new Error('User no longer exists');
    }

    req.user = freshUser;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

// Registers new user and sends JWT
exports.signup = async (req, res, next) => {
  try {
    if (req.body.password === req.body.passwordConfirm) {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar,
      });

      createSendToken(newUser, 200, res);
    } else {
      throw new Error('Passwords must match');
    }
  } catch (err) {
    console.log(err.message);
    next();
  }
};

// Login user and sent JWT
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if body contains username and password
    if (!username || !password) {
      throw new Error('Enter username and password');
    }

    // Check if user exists & Verify Password
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await User.correctPassword(password, user.password))) {
      throw new Error('Incorrect username or password');
    }

    createSendToken(user, 200, res);
  } catch (err) {
    console.log(err.message);
    next();
  }
};
