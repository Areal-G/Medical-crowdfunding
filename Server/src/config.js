require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const LOCAL_DOMAIN = process.env.LOCAL_DOMAIN;
const NETWORK_DOMAIN = process.env.NETWORK_DOMAIN;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = {
  PORT,
  DB_URI,
  SESSION_SECRET,
  CHAPA_SECRET_KEY,
  LOCAL_DOMAIN,
  NETWORK_DOMAIN,
  STRIPE_SECRET_KEY,
  EMAIL_USER,
  EMAIL_PASS,
};
