const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const cors = require('cors');
const { PORT, DB_URI, SESSION_SECRET, NETWORK_DOMAIN, LOCAL_DOMAIN } = require('./config.js');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const SystemAdmin = require('./models/systemAdmin');

const app = express();
// cors and under that are for the api cookies working
const allowedOrigins = [NETWORK_DOMAIN, LOCAL_DOMAIN];

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

const registerAdmin = async () => {
  try {
    const sysAdmin = await SystemAdmin.findOne({ email: 'arealgizaw@gmail.com' });

    if (!sysAdmin) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('ENtadeg@2024', saltRounds);
      const systemAdminData = {
        fullname: 'areal gizaw',
        email: 'arealgizaw@gmail.com',
        password: hashedPassword,
        image:
          'https://res.cloudinary.com/daecqeccw/image/upload/v1716905044/hq5jpcynflnfaapyx63w.png',
        role: 'systemAdmin',
      };
      const systemAdmin = new SystemAdmin(systemAdminData);
      await systemAdmin.save();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to Database');
    registerAdmin();
  })
  .catch((err) => console.log(`Errormongoose: ${err}`));

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
