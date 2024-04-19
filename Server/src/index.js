const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const cors = require('cors');
const { PORT, DB_URI, SESSION_SECRET } = require('./config.js');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const Hospital = require('./models/hospital.js');
const patient = require('./models/patient.js');

const app = express();

app.use(cors());
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
  console.log('Full request:', req.session.passport.user);
  next();
});

app.use('/', routes);

mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(`Errormongoose: ${err}`));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// const schema = new mongoose.Schema({
//   username: { type: String },
//   password: { type: String },
// });

// customerSchema.methods.verifyPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// customerSchema.methods.verifyPassword = function (password) {
//   return this.password === password;
// };

// const Customer = mongoose.model('Customer', schema);

//findCustomer();

// const tr = new patient({
//   email: 'patient1@gmail.com',
//   password: 'patient1',
// });

// tr.save()
//   .then(() => {
//     console.log('Customer saved successfully');
//   })
//   .catch((err) => {
//     console.error('Error saving customer:', err);
//   });

// async function findCustomer() {
//   const customer = await Customer.findOne({ username: 'areal' }).exec();
//   console.log('Customer:', customer);
// }

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
