const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');
//= /api/payment

router.post('/stripepay', paymentController.stripePay);
router.get('/stripeSessionDetails/:sessionId', paymentController.stripeSessionDetails);
router.post('/savestripetransaction', paymentController.saveStripeTransaction);
router.post('/chapapay', paymentController.chapaPay);
router.post('/savechapatransaction', paymentController.saveChapaTransaction);
module.exports = router;
