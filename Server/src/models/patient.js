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

  createdAt: {
    type: Date,
    default: Date.now,
  },
  accountStatus: {
    type: String,
    // enum: {
    //   values: ["Active", "Inactive"],
    //   message:
    //     "Invalid status value. Must be one of: Pending, Active, Inactive, Suspended, Archived.",
    // },
    // default: status.ACTIVE,
    // required: [true, "Status is required"],
  },
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
