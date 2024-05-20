const { Chapa } = require('chapa-nodejs');
const { CHAPA_SECRET_KEY } = require('../config');

const chapa = new Chapa({
  secretKey: CHAPA_SECRET_KEY,
});

module.exports = chapa;
