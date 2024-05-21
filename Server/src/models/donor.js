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
    type: [String], // Array of strings to store image URLs
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
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // donatedTo: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Campaign'
  // }],

  totalDonated: {
    type: Number,
    default: 0,
  },
});

const Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
