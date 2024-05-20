const stripe = require('stripe')(
  'sk_test_51PI85V08YHfLR3hE13GGZlt6J0uACf0qfPvFoQvAg2ZtAM2qzWvjcPeFR3kYfsHyxGO7g1vKO2Rrnc4gidmMJFEf00xbVW1js2'
);

const chapa = require('../../src/config/chapa');

const Transaction = require('../models/Transaction');

const endpointSecret = 'whsec_...';

const DOMAIN = 'http://192.168.0.199:5173';

exports.stripePay = async (req, res, next) => {
  const { donationAmount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
            },
            unit_amount: donationAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DOMAIN}/campaigndetail?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/campaigndetail?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.stripeSessionDetails = async (req, res, next) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveStripeTransaction = async (req, res, next) => {
  const { amount, currency, transactionId } = req.body;
  console.log(req.body);
  // campaign id yekeral
  const paymentProvider = 'stripe';
  try {
    const newTransaction = new Transaction({
      amount,
      currency,
      transactionId,
      paymentProvider,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.chapaPay = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const tx_ref = await chapa.generateTransactionReference();
    console.log(tx_ref);

    const response = await chapa.initialize({
      first_name: 'abebe',
      last_name: 'bekele',
      email: 'abebe@gmail.com',
      currency: 'ETB',
      amount: amount,
      tx_ref: tx_ref,
      // callback_url: `https://appurl.io/2-5LjAXVBd`,
      return_url: `http://192.168.1.103:5173/chaparedirect?success=true&ref=${tx_ref}`,
      customization: {
        title: 'Donation',
      },
    });

    res.json(response.data.checkout_url);
    console.log(response);
    console.log(tx_ref);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.saveChapaTransaction = async (req, res, next) => {
  const { tx_ref } = req.body;
  console.log(req.body);

  const response = await chapa.verify({
    tx_ref: tx_ref,
  });
  // campaign id yekeral

  const paymentProvider = 'chapa';
  const amount = response.data.amount;
  const currency = 'ETB';
  const transactionId = response.data.tx_ref;

  try {
    const newTransaction = new Transaction({
      amount,
      currency,
      transactionId,
      paymentProvider,
    });

    console.log(newTransaction);

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
