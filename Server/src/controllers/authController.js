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
      return res
        .status(500)
        .json({ success: false, message: 'An error occurred during authentication.' });
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to log in user.' });
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
      return res.json({ success: true, message: 'Authentication successful', role });
    });
  })(req, res, next);
};

exports.Logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Failed to destroy session');
      }

      res.clearCookie('connect.sid');
      res.status(200).send('Successfully logged out');
    });
  });
};

exports.isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
};
