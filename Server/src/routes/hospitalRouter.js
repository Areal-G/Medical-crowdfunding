const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const fetchController = require('../controllers/fetchController');
//= /api/hospital

router.post('/register', registerController.patientRegister);

module.exports = router;
