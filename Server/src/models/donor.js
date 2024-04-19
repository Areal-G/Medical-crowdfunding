const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
