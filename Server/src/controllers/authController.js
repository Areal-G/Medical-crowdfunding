const passport = require('passport');
const passportConfig = require('../config/passportConfig'); // dont remove else doesnt go to passport confid

exports.Login = (req, res, next) => {
  const { role } = req.body;

  let strategy;
  if (role === 'patient') {
    strategy = 'patient-local';
  } else if (role === 'hospital') {
    strategy = 'hospital-local';
  } else if (role === 'donor') {
    strategy = 'donor-local';
  } else if (role === 'systemAdmin') {
    strategy = 'systemAdmin-local';
  } else {
    return res.status(400).send('Invalid role');
  }

  passport.authenticate(strategy, function (err, user, info) {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err); // Handle error appropriately
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).send('Authentication failed');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      // 2 days for 'patient' and 'donor' roles
      if (role === 'patient' || role === 'donor') {
        req.session.cookie.maxAge = 2 * 24 * 60 * 60 * 1000;
      }
      // 20 minutes for 'systemAdmin' and 'hospital' roles
      else if (role === 'systemAdmin' || role === 'hospital') {
        req.session.cookie.maxAge = 20 * 60 * 1000;
      }
      console.log('Authentication successful');
      return res.json({ role });
    });
  })(req, res, next);
};
