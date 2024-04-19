const passport = require('passport');
const configuredPassport = require('../config/passport');

// exports.Login = (req, res, next) => {
//   configuredPassport.authenticate('local', {
//     successRedirect: getSuccessRedirect(req.body.role),
//     failureRedirect: '/login',
//   })(req, res, next);
// };

exports.Login = (req, res, next) => {
  configuredPassport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log('Error:', err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed');
      // You may want to send an appropriate response to the client for failed authentication
      return res.status(401).send('Authentication failed');
    } else {
      console.log('Authentication successful');
      // You may want to send an appropriate response to the client for successful authentication
      return res.status(200).send('Authentication successful');
    }
  })(req, res, next);
};

// exports.Logout = (req, res) => {
// };

// Helper function to determine the success redirect URL based on the role
function getSuccessRedirect(role) {
  if (role === 'donor') {
    return '/donor-dashboard';
  } else if (role === 'patient') {
    return '/patient-dashboard';
  }
  // Add more conditions for other roles if needed
  return '/dashboard'; // Default redirect URL
}
