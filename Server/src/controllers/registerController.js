const Donor = require('../models/donor');
const Hospital = require('../models/hospital');
const Patient = require('../models/patient');
const SystemAdmin = require('../models/systemAdmin');
// bcrypt  later after the models are on the last stage bc i have to destructure here
// donor
exports.donorRegister = async (req, res, next) => {
  try {
    const { password, ...donorData } = req.body;
    const donor = new Donor({ password, ...donorData });
    await donor.save();
    res.status(201).json('Saved succesfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

// hospital register
exports.hospitalRegister = async (req, res, next) => {
  try {
    const { password, ...hospitalData } = req.body;
    const hospital = new Hospital({ ...hospitalData, password });
    await hospital.save();
    res.status(201).json('Saved succesfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

//patient
exports.patientRegister = async (req, res, next) => {
  try {
    const { password, ...patientData } = req.body;
    const patient = new Patient({ ...patientData, password });
    await patient.save();
    await Hospital.updateOne({ _id: req.user._id }, { $push: { patients: patient._id } });
    res.status(201).json('Saved succesfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

// system admin
// exports.sysAdminRegister = async (req, res, next) => {
//   try {
//     const user = req.body;
//     const systemAdmin = new SystemAdmin(user);
//     await systemAdmin.save();
//     res.status(201).json(systemAdmin);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred during registration.' });
//   }
// };
