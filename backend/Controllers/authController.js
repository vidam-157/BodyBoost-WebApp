const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create a new user
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    // Create a directory for the user
    createUserDirectory(user._id.toString()); // added for user specific home page

    // Create a token
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY', { expiresIn: '7d' });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
    
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({ error: 'Invalid password or email' });
  }

  try {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(422).json({ error: 'Invalid password or email' });
    }

    // Create a token
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY', { expiresIn: '7d' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};