const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/login',
  authController.Login
  // first validator,
  // passport to auth controller
);

router.get('/hi', (req, res) => {
  console.log("Hi, it's me");
  res.send("Hi, it's me");
});

router.post(
  '/logout'
  // do stg
);

module.exports = router;
