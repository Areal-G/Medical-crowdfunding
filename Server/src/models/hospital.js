const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  image: {
    type: [String],
  },
  state: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'hospital',
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  ],
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'blocked'],
  },

  bankAccount: {
    accountHolderName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    bankName: {
      type: String,
    },
  },
  isAccountNew: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
