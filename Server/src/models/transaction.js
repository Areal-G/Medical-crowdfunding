const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
