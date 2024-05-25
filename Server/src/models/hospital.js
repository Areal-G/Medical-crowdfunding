const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
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

  bankAccount: [
    {
      accountHolderName: {
        type: String,
        required: [true, 'Account holder name is required'],
      },
      accountNumber: {
        type: String,
        required: [true, 'Account number is required'],
      },
      bankName: {
        type: String,
        required: [true, 'Bank name is required'],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
