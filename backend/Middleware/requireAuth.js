const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const requireAuth = async (req, res, next) => {

  // Verifies the JWT token from the request header
  const { authorization } = req.headers;

  // Retrieves the user associated with the token and attaches it to the request object.
  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { userId } = jwt.verify(token, 'MY_SECRET_KEY');
    req.user = await User.findById(userId).select('_id');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Request is not authorized' });
  }
  
};

module.exports = requireAuth;
