const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const paymentController = require('../controllers/paymentController');
//= /api/payment

router.post('/stripepay', paymentController.stripePay);
router.get('/stripeSessionDetails/:sessionId', paymentController.stripeSessionDetails);
router.post('/saveTransaction', paymentController.saveTransaction);

module.exports = router;
