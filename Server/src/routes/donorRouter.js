const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
//=/api/donor

router.post(
  '/register',
  registerController.donorRegister

  // first validator,
  // passport to auth controller
);
module.exports = router;
