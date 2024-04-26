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
app.use(
  cors()
  //   {
  //   origin: 'http://localhost:5175',
  //   credentials: true,
  // }
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
  console.log('Full request:');
  console.log('Full request:', req.session);
  // console.log('res', res.session);
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
