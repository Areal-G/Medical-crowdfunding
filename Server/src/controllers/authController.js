const passport = require('passport');
const passportConfig = require('../config/passportConfig'); // dont remove else doesnt go to passport confid
const OTP = require('../models/otp');
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('../config');
exports.Login = (req, res, next) => {
  const { role, email } = req.body;

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
    req.logIn(user, async function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to log in user.' });
      }

      if (role === 'hospital' || role === 'systemAdmin') {
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
        await OTP.create({ email, otp });

        // Send OTP to user's email
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: EMAIL_USER,
          to: email,
          subject: 'Your OTP Code',
          text: `Your OTP code is ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });

        return res.json({ success: true, message: 'OTP sent to email', otpRequired: true, role });
      } else {
        // Set session expiry time for 'patient' and 'donor' roles
        if (role === 'patient' || role === 'donor') {
          req.session.cookie.maxAge = 2 * 24 * 60 * 60 * 1000;
        }
        // Set session expiry time for 'systemAdmin' and 'hospital' roles (will be updated after OTP verification)
        return res.json({ success: true, message: 'Authentication successful', role });
      }
    });
  })(req, res, next);
};

exports.verifyOtp = async (req, res) => {
  const { email, otp, role } = req.body;
  console.log(req.body);

  const validOtp = await OTP.findOne({ email, otp });
  if (!validOtp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  // Remove used OTP
  await OTP.deleteOne({ email, otp });

  // Set session expiry time for 'systemAdmin' and 'hospital' roles
  if (role === 'systemAdmin' || role === 'hospital') {
    req.session.cookie.maxAge = 20 * 60 * 1000;
  }

  return res.json({ success: true, message: 'OTP verified', role });
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
