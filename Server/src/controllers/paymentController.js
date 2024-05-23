const { LOCAL_DOMAIN, NETWORK_DOMAIN, STRIPE_SECRET_KEY } = require('../config');

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const chapa = require('../../src/config/chapa');
const Transaction = require('../models/transaction');

exports.stripePay = async (req, res, next) => {
  const { donationAmount, donationMessage, isAnonymous, campaignId } = req.body;
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
      success_url:
        `${LOCAL_DOMAIN}/campaigndetail/${campaignId}?success=true&session_id={CHECKOUT_SESSION_ID}` +
        `&donationMessage=${encodeURIComponent(donationMessage)}` +
        `&isAnonymous=${encodeURIComponent(isAnonymous)}`,
      cancel_url: `${LOCAL_DOMAIN}/campaigndetail?canceled=true`,
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
  const { amount, currency, transactionId, donationMessage, isAnonymous, campaignId } = req.body;
  console.log(req.body);
  const donorId = req.user._id;
  const paymentProvider = 'stripe';
  try {
    const newTransaction = new Transaction({
      amount,
      currency,
      transactionId,
      paymentProvider,
      donorId,
      donationMessage,
      isAnonymous,
      campaignId,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.chapaPay = async (req, res, next) => {
  try {
    const { amount, message, isAnonymous, campaignId } = req.body;
    const tx_ref = await chapa.generateTransactionReference();
    console.log(tx_ref);
    const fullname = req.user.fullname;
    const [first_name, ...last_name_parts] = fullname.split(' ');
    const last_name = last_name_parts.join(' ');

    const response = await chapa.initialize({
      first_name: first_name,
      last_name: last_name,
      email: req.user.email,
      currency: 'ETB',
      amount: amount,
      tx_ref: tx_ref,
      // callback_url: ``,
      return_url:
        `${NETWORK_DOMAIN}/chaparedirect/${campaignId}?success=true&tx_ref=${tx_ref}` +
        `&donationMessage=${encodeURIComponent(message)}` +
        `&isAnonymous=${encodeURIComponent(isAnonymous)}`,
      customization: {
        title: 'Donation',
      },
    });

    res.json(response.data.checkout_url);
    console.log(response);
    console.log();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.saveChapaTransaction = async (req, res, next) => {
  const { tx_ref, donationMessage, isAnonymous, campaignId } = req.body;
  console.log(req.body);

  const response = await chapa.verify({
    tx_ref: tx_ref,
  });
  // campaign id yekeral
  const donorId = req.user._id;

  const paymentProvider = 'chapa';
  const amount = response.data.amount;
  const currency = 'etb';
  const transactionId = response.data.tx_ref;

  try {
    const newTransaction = new Transaction({
      amount,
      currency,
      transactionId,
      paymentProvider,
      donorId,
      donationMessage,
      isAnonymous,
      campaignId,
    });

    console.log(newTransaction);

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
