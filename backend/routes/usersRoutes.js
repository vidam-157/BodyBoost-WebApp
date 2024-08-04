const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/usersController');
const requireAuth = require('../Middleware/requireAuth');

const router = express.Router();

// GET user details (Protected route, requires authentication)
router.get('/me', requireAuth, getUserDetails);

// PUT update user details (Protected route, requires authentication)
router.put('/me', requireAuth, updateUserDetails);

module.exports = router;