const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');
const Transaction = require('../models/transaction');
const Donor = require('../models/donor');
const bcrypt = require('bcrypt');

exports.updateHospitalStatus = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    hospital.status = req.body.status;
    await hospital.save();
    res.send('sucessful');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateDonorStatus = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.params.id);
    donor.status = req.body.status;
    await donor.save();
    res.send('sucessful');
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.updatePatientStatus = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    patient.status = req.body.status;
    await patient.save();

    res.send('sucessful');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateCampaignStatus = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    campaign.status = req.body.status;
    await campaign.save();
    res.send('sucessful');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateDonorPassword = async (req, res, next) => {
  console.log('hi');
  const { oldPassword, password } = req.body;

  if (!oldPassword || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const donor = await Donor.findById(req.user.id);
    if (!donor) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('ccc');
    console.log(donor.password, oldPassword);
    const isMatch = await bcrypt.compare(oldPassword, donor.password);
    console.log(isMatch);
    console.log('fff');
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }
    console.log('ddd');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    donor.password = hashedPassword;
    await donor.save();
    console.log('eee');
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDonorImage = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.user.id);
    if (!donor) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(req.body);
    console.log('hi');

    donor.image = req.body.image;
    await donor.save();

    res.json({ message: 'image updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDonorPersonalDetails = async (req, res, next) => {
  const { fullname, phoneNumber, email, country, city } = req.body;
  try {
    const donor = await Donor.findById(req.user.id);
    if (!donor) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.body);

    donor.fullname = fullname;
    donor.phoneNumber = phoneNumber;
    donor.email = email;
    donor.country = country;
    donor.city = city;
    await donor.save();

    res.json({ message: ' updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
