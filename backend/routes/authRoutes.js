const express = require('express');
const { registerUser, loginUser } = require('../controllers/AuthController');

const router = express.Router();

// route to register a user
router.post('/register', registerUser);

// route to login a user
router.post('/login', loginUser);

module.exports = router;