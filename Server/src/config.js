require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

module.exports = { PORT, DB_URI, SESSION_SECRET, CHAPA_SECRET_KEY };
