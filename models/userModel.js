const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have a username'],
    unique: [true, 'Username is already taken. Choose another'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters'],
    required: [true, 'Please enter a password'],
    select: false,
  },
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'room',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt and Store password on save
userSchema.pre('save', async function (next) {
  // Only will run if password has been modified
  if (!this.isModified('password')) return next();

  // Hash Password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
