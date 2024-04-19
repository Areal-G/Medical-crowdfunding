const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const tryd = mongoose.model('tryd', schema);

module.exports = tryd;
