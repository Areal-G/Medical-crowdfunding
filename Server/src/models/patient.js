const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  patientId: {
    type: String,
  },
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
  },
  phoneNumber: {
    type: String,
  },
  image: {
    type: [String],
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
  isAccountNew: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
