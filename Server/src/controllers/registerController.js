const bcrypt = require('bcrypt');
const Donor = require('../models/donor');
const Hospital = require('../models/hospital');
const Patient = require('../models/patient');
const saltRounds = 10;

exports.donorRegister = async (req, res, next) => {
  try {
    const { password, ...donorData } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const donor = new Donor({ password: hashedPassword, ...donorData });
    await donor.save();
    res.status(201).json('Saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.hospitalRegister = async (req, res, next) => {
  try {
    const { password, ...hospitalData } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hospital = new Hospital({ ...hospitalData, password: hashedPassword });
    await hospital.save();
    res.status(201).json('Saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.patientRegister = async (req, res, next) => {
  try {
    const { password, ...patientData } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const patient = new Patient({ ...patientData, password: hashedPassword });
    await patient.save();
    await Hospital.updateOne({ _id: req.user._id }, { $push: { patients: patient._id } });
    res.status(201).json('Saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};
