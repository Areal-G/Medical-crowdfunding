const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
//=/api/patient

router.post(
  '/register',
  registerController.patientRegister

  // first validator,
  // passport to auth controller
);
module.exports = router;
