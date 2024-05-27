const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');
const Transaction = require('../models/transaction');
const Donor = require('../models/donor');
const SystemAdmin = require('../models/systemAdmin');
const {
  calculateRaisedMoney,
  tableWeeklyTransactions,
  getTodayTransactionsCount,
  getWeeklyData,
} = require('../helpers/campaignhelpers');

exports.getHospitalsTable = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDonorsTable = async (req, res, next) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPatientsTable = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCampaignsTable = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPatientsTableInHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findOne({ _id: req.user._id }).populate('patients');
    const patients = hospital.patients;
    res.status(200).json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCampaignsTableInHospital = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ hospital: req.user._id });
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDonorNavData = async (req, res, next) => {
  try {
    const donor = await Donor.findOne({ _id: req.user._id });
    const transactions = await Transaction.find({ campaignId: req.user._id });
    let raisedMoney = calculateRaisedMoney(transactions);
    res.status(200).json({ donor, raisedMoney });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAdminNavData = async (req, res, next) => {
  try {
    const systemAdmin = await SystemAdmin.findOne({ _id: req.user._id });
    res.status(200).json(systemAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPatientNavData = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ _id: req.user._id });
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getHospitalNavData = async (req, res, next) => {
  try {
    const hospital = await Hospital.findOne({ _id: req.user._id });
    res.status(200).json(hospital);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
