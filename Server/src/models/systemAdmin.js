const mongoose = require('mongoose');

const SystemAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const SystemAdmin = mongoose.model('SystemAdmin', SystemAdminSchema);

module.exports = SystemAdmin;
