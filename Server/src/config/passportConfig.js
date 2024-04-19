const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const Donor = require('../models/donor');
//const Patient = require('../models/patient');
const tryd = require('../models/try');

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await tryd.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Invalid username' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize the user object into the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize the user object from the session
passport.deserializeUser(function (id, done) {
  tryd.findById(id, function (err, user) {
    if (err) {
      console.error('Error deserializing user:', err);
      return done(err);
    }
    done(null, user);
  });
});
module.exports = passport;

// passport.use(
//   'donor-local',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//     },
//     async (email, password, done) => {
//       try {
//         const donor = await Donor.findOne({ email });

//         if (!donor) {
//           return done(null, false, { message: 'Incorrect email or password.' });
//         }

//         const isPasswordValid = await donor.verifyPassword(password);

//         if (!isPasswordValid) {
//           return done(null, false, { message: 'Incorrect email or password.' });
//         }

//         return done(null, donor);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// passport.use(
//   'patient-local',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//     },
//     async (email, password, done) => {
//       try {
//         const patient = await Patient.findOne({ email });

//         if (!patient) {
//           return done(null, false, { message: 'Incorrect email or password.' });
//         }

//         const isPasswordValid = await patient.verifyPassword(password);

//         if (!isPasswordValid) {
//           return done(null, false, { message: 'Incorrect email or password.' });
//         }

//         return done(null, patient);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

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
