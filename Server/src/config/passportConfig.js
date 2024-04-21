const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const tryd = require('../models/try');
const hospital = require('../models/hospital');
const patient = require('../models/patient');
const donor = require('../models/donor');
const systemAdmin = require('../models/systemAdmin');

//patient

passport.use(
  'patient-local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await patient.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Invalid email' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// hospital

passport.use(
  'hospital-local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await hospital.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Invalid email' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//donor
passport.use(
  'donor-local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await donor.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Invalid email' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  'systemAdmin-local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await systemAdmin.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Invalid email' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize the user object into the session
passport.serializeUser(async function (user, done) {
  // const usermodel = await tryd.findOne({ username: user });
  console.log(`inside ${user.email} and ${user._id}`);
  done(null, user.id);
});

// Deserialize the user object from the session
passport.deserializeUser(function (id, done) {
  ////////// insert role then find by role
  tryd.findById(id, function (err, user) {
    console.log('Deserialized user ID:', id);
    if (err) {
      console.error('Error deserializing user:', err);
      return done(err);
    }
    done(null, user);
  });
  console.log(id);
});

module.exports = passport;

// passport.serializeUser((user, done) => {
//   done(null, { id: user.id, role: user.role }); // Saving user ID and role in the session
// });

// passport.deserializeUser(async ({ id, role }, done) => {
//   try {
//     let user;

//     if (role === 'donor') {
//       user = await Donor.findById(id);
//     } else if (role === 'patient') {
//       user = await Patient.findById(id);
//     }

//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });
