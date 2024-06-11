const bcrypt = require('bcrypt');
const Donor = require('../models/donor');
const Hospital = require('../models/hospital');
const Patient = require('../models/patient');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { EMAIL_USER, EMAIL_PASS } = require('../config');

const generatePassword = () => {
  return uuidv4().slice(0, 6); // Generates a 6-character password
};

const sendEmail = async (email, password) => {
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
    subject: 'Your New Account Password',
    text: `Your password is: ${password}`,
  };

  await transporter.sendMail(mailOptions);
};

exports.donorRegister = async (req, res, next) => {
  try {
    const { password, ...donorData } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const donor = new Donor({ password: hashedPassword, ...donorData });
    await donor.save();
    res.status(201).json('account created successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.hospitalRegister = async (req, res, next) => {
  const { hospitalName, email } = req.body;
  console.log(hospitalName, email);
  if (!hospitalName || !email) {
    return res.status(400).json({ error: 'Hospital name and email are required.' });
  }

  try {
    const password = generatePassword();
    await sendEmail(email, password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const hospitalData = { hospitalName, email, password: hashedPassword };
    const hospital = new Hospital(hospitalData);
    await hospital.save();

    res.status(201).json('Account created successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.hospitalCreateAccount = async (req, res, next) => {
  try {
    const { password, ...hospitalData } = req.body;
    const { id } = req.user;

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    Object.assign(hospital, hospitalData, { password: hashedPassword });
    hospital.isAccountNew = 'false';

    await hospital.save();

    res.status(200).json('Hospital account saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during the update.' });
  }
};

exports.patientRegister = async (req, res, next) => {
  const { patientName, patientId, email } = req.body;
  console.log(patientName, email);
  if (!patientName || !email) {
    return res.status(400).json({ error: 'Patient name and email are required.' });
  }

  try {
    const password = generatePassword();
    await sendEmail(email, password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const patientData = { patientName, patientId, email, password: hashedPassword };
    const patient = new Patient(patientData);
    await patient.save();
    await Hospital.updateOne({ _id: req.user._id }, { $push: { patients: patient._id } });

    res.status(201).json('Account created successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.patientCreateAccount = async (req, res, next) => {
  try {
    const { password, ...patientData } = req.body;
    const { id } = req.user;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    Object.assign(patient, patientData, { password: hashedPassword });
    patient.isAccountNew = 'false';

    await patient.save();

    res.status(200).json('Hospital account saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during the update.' });
  }
};
