const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: {
    et: { type: String, required: true },
    en: { type: String, required: true },
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'hospital',
  },
  // bankAccount: [
  //   {
  //     accountHolderName: {
  //       type: String,
  //       required: [true, 'Account holder name is required'],
  //     },
  //     accountNumber: {
  //       type: String,
  //       required: [true, 'Account number is required'],
  //     },
  //     bankName: {
  //       type: String,
  //       required: [true, 'Bank name is required'],
  //     },
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
