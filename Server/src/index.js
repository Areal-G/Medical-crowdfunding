const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const cors = require('cors');
const { PORT, DB_URI, SESSION_SECRET } = require('./config.js');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
// cors and under that are for the api cookies working
const allowedOrigins = ['http://192.168.0.199:5173', 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   const requestOrigin = req.headers.origin;
//   res.setHeader('Access-Control-Allow-Origin', requestOrigin);
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB_URI,
    }),
  })
);
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.originalUrl}`);
  // console.log(req.body);
  console.log('Full session:', req.session);

  next();
});
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(`Errormongoose: ${err}`));

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
