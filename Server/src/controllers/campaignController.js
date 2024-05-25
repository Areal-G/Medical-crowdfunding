const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');
const Transaction = require('../models/transaction');
const Donor = require('../models/donor');
const {
  calculateRaisedMoney,
  tableWeeklyTransactions,
  getTodayTransactionsCount,
  getWeeklyData,
} = require('../helpers/campaignhelpers');

exports.createCampaign = async (req, res, next) => {
  try {
    const hospital = await Hospital.findOne({ patients: req.user._id });
    if (!hospital) {
      res.status(404).json({ error: 'Hospital not found for patient' });
      return;
    }

    const campaign = new Campaign({
      ...req.body,
      hospital: hospital._id,
    });

    await campaign.save();

    await Patient.updateOne({ _id: req.user._id }, { $set: { campaign: campaign._id } });

    res.status(201).json('Saved Successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().populate('hospital'); // Query the database and populate the 'hospital' field if needed
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.getCampaignDetailForDonor = async (req, res, next) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findOne({ _id: campaignId }).populate('hospital');
    const deadlineDate = Math.ceil(
      (campaign.campaignDate - campaign.createdAt) / (1000 * 60 * 60 * 24)
    );

    const transactions = await Transaction.find({ campaignId }).populate('donorId');
    let raisedMoney = calculateRaisedMoney(transactions);
    let donations = 0;
    donations = transactions.length;
    let raisedPercent = 0;
    raisedPercent = Math.ceil(raisedMoney / campaign.target) * 100;

    res.status(200).json({
      campaign,
      transactions,
      totalRaisedMoney: raisedMoney,
      deadlineDate,
      raisedPercent,
      donations,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.getPatientDashboard = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.user.campaign });
    const transactions = await Transaction.find({ campaignId: req.user.campaign }).populate(
      'donorId'
    );

    let raisedMoney = calculateRaisedMoney(transactions);
    const { flooredWeekData, daysOfWeek } = tableWeeklyTransactions(transactions);
    let donations = transactions.length;
    const donationsToday = await getTodayTransactionsCount(req.user.campaign);
    let raisedMoneyToday = calculateRaisedMoney(donationsToday);

    res.status(200).json({
      campaign,
      transactions,
      totalRaisedMoney: raisedMoney,
      chartData: flooredWeekData,
      daysOfWeek,
      donations,
      raisedMoneyToday,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.getCampaignDetailForPatient = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.user.campaign });

    res.status(200).json(campaign);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.getAdminDashboard = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    const patients = await Patient.find();
    const hospitals = await Hospital.find();
    const donors = await Donor.find();
    const patientData = getWeeklyData(patients);
    const hospitalData = getWeeklyData(hospitals);
    const donorData = getWeeklyData(donors);

    const numberOfDonors = donors.length;
    const numberOfPatients = patients.length;
    const numberOfHospitals = hospitals.length;

    let totalMoney = calculateRaisedMoney(transactions);
    const donationsToday = await getTodayTransactionsCount();
    let raisedMoneyToday = calculateRaisedMoney(donationsToday);
    const numberOfDonationsToday = donationsToday.length;

    res.status(200).json({
      patients: patientData,
      hospitals: hospitalData,
      donors: donorData,
      totalMoney,
      raisedMoneyToday,
      numberOfDonors,
      numberOfPatients,
      numberOfHospitals,
      numberOfDonationsToday,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
