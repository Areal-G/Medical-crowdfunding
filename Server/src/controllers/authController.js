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
      console.log('Authentication successful');
      return res.status(200).send('Authentication successful');
    });
  })(req, res, next);
};

// exports.Logout = (req, res) => {
// };

// // Helper function to determine the success redirect URL based on the role
// function getSuccessRedirect(role) {
//   if (role === 'donor') {
//     return '/donor-dashboard';
//   } else if (role === 'patient') {
//     return '/patient-dashboard';
//   }
//   // Add more conditions for other roles if needed
//   return '/dashboard'; // Default redirect URL
// }
