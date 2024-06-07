const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // OTP will be removed from the database after 2 minute
  },
});

const OTP = mongoose.model('OTP', OtpSchema);

module.exports = OTP;
