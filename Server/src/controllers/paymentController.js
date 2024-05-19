const stripe = require('stripe')(
  'sk_test_51PI85V08YHfLR3hE13GGZlt6J0uACf0qfPvFoQvAg2ZtAM2qzWvjcPeFR3kYfsHyxGO7g1vKO2Rrnc4gidmMJFEf00xbVW1js2'
);

const Transaction = require('../models/Transaction');

const endpointSecret = 'whsec_...';

const YOUR_DOMAIN = 'http://localhost:5173';

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
      success_url: `${YOUR_DOMAIN}/campaigndetail?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/campaigndetail?canceled=true`,
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

exports.saveTransaction = async (req, res, next) => {
  const { amount, currency, transactionId, status } = req.body;
  console.log(req.body);
  // campaign id yekeral

  try {
    const newTransaction = new Transaction({
      amount,
      currency,
      transactionId,
      status,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
