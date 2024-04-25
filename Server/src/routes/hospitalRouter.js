const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
//= /api/hospital

router.post(
  '/register',
  registerController.hospitalRegister

  // first validator,
  // passport to auth controller
);

router.get('/halo', (req, res) => {
  console.log("Hi, it's me");
  res.send("Hi, it's me");
});

module.exports = router;
