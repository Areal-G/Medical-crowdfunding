const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/login',
  authController.Login
  // first validator,
  // passport to auth controller
);

router.get('/hi', async (req, res) => {
  console.log('req.user', req.user);
  res.send(req.user?.role);
});

router.post(
  '/logout'
  // do stg
);

module.exports = router;
