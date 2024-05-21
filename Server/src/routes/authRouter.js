const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//  api/auth
router.post(
  '/login',
  authController.Login
  // first validator,
  // passport to auth controller
);

router.get('/logout', authController.Logout);

module.exports = router;
