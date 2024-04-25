const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

//=/api/sysadmin

router.post(
  '/register',
  registerController.sysAdminRegister

  // first validator,
  // passport to auth controller
);
module.exports = router;
