const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const { Customer } = require('../index');
//const Donor = require('../models/donor');
//const Patient = require('../models/patient');
const tryd = require('../models/try');

//console.log(Customer);

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
// try {
//     const finduser = Customer.find(( user) => user.username === username);
//     if (!finduser)
//         throw new Error('user not found');
//     if (finduser.password !== password)
//         throw new Error('invalid password');
//     done(null, finduser);

// } catch (err) {
//     done(err,null)
// }

// Customer.findOne({ username: username }, function (err, user) {
//   if (err) {
//     return done(err);
//   }
//   if (!user) {
//     return done(null, false);
//   }
//   if (!user.verifyPassword(password)) {
//     return done(null, false);
//   }
//   return done(null, user);
// });

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
