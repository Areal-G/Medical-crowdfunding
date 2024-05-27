const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');
const Transaction = require('../models/transaction');
const Donor = require('../models/donor');

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
