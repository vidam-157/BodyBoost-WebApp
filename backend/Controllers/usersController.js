const User = require('../Models/userModel');

// Get user details (protected route)
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user details (protected route)
const updateUserDetails = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserDetails,
  updateUserDetails,
};

// Handles actions that require user authentication,
      // * Fetching user details
      // * Updating user information.