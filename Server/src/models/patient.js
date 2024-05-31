const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  patientName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
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
    default: 'patient',
  },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },

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

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
