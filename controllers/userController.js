const User = require('./../models/userModel');

// Deletes User
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err.message);
    next();
  }
};
