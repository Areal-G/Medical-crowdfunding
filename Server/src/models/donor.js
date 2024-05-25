const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  image: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'donor',
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'blocked'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
