const mongoose = require('mongoose');

const SystemAdminSchema = new mongoose.Schema({
  fullname: {
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
  image: {
    type: [String],
    required: true,
  },
  role: {
    type: String,
    default: 'systemAdmin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SystemAdmin = mongoose.model('SystemAdmin', SystemAdminSchema);

module.exports = SystemAdmin;
