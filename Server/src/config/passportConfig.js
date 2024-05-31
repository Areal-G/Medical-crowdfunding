const bcrypt = require('bcrypt');
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }
        if (user.status === 'blocked') {
          return done(null, false, {
            message: 'You are blocked. Please contact the administrator',
          });
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }
        if (user.status === 'blocked') {
          return done(null, false, {
            message: 'You are blocked. Please contact the administrator',
          });
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }
        if (user.status === 'blocked') {
          return done(null, false, {
            message: 'You are blocked. Please contact the administrator',
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// system admin

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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
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
  // Serialize both the ID and email properties
  const serializedUser = {
    id: user._id,
    role: user.role,
  };

  done(null, serializedUser);
});

passport.deserializeUser(async function (serializedUser, done) {
  try {
    let user;
    if (serializedUser.role === 'patient') {
      user = await patient.findById(serializedUser.id);
    } else if (serializedUser.role === 'hospital') {
      user = await hospital.findById(serializedUser.id);
    } else if (serializedUser.role === 'donor') {
      user = await donor.findById(serializedUser.id);
    } else if (serializedUser.role === 'systemAdmin') {
      user = await systemAdmin.findById(serializedUser.id);
    }

    // If the user is not found, handle the case appropriately
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
