const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // name
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
