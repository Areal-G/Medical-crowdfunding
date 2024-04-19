const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
  // hospital id
  // campaign id
);

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
