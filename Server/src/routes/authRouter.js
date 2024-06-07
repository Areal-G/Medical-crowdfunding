const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//  api/auth
router.post('/login', authController.Login);
router.post('/verify-otp', authController.verifyOtp);

router.get('/logout', authController.Logout);
router.get('/isloggedin', authController.isLoggedIn);

module.exports = router;
