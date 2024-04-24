const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

passport.serializeUser(async function (user, done) {
  console.log(` full user in serializer ${user}`);
  console.log(`inside serializer ${user.email} and ${user._id}`);
  done(null, user.id);
  // need to insert role in the model
});

// idk if deserializer works or not but the console log dosnt log
passport.deserializeUser(async function (id, done) {
  console.log(`inside deserializer  ${id}`);
  try {
    const user = await hospital.findById(id);
    done(null, user);
    console.log(` inside desirializer 2 ${id}`);
  } catch (err) {
    done(err);
  }
});
// passport.deserializeUser(function (id, done) {
//   ////////// insert role then find by role

//   hospital.findById(id, function (err, user)
//   {
//     console.log('Deserialized user ID:', id);
//     if (err) {
//       console.error('Error deserializing user:', err);
//       return done(err);
//     }
//     done(null, user);
//   });
//   console.log(id);
// });

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
