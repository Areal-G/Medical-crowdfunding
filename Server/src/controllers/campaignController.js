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

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('hospital');

    let campaignsResult = [];

    for (let campaign of campaigns) {
      const transactions = await Transaction.find({ campaignId: campaign._id }).populate('donorId');
      let raisedMoney = calculateRaisedMoney(transactions);
      let donations = transactions.length;
      let raisedPercent = ((raisedMoney / campaign.target) * 100).toFixed(1);

      campaignsResult.push({
        ...campaign._doc,
        transactions,
        raisedMoney,
        donations,
        raisedPercent,
      });
    }

    res.status(200).json(campaignsResult);
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
    let raisedPercent = ((raisedMoney / campaign.target) * 100).toFixed(1);

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

exports.getHospitalDashboard = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ hospitalId: req.user._id });
    const hospital = await Hospital.findOne({ _id: req.user._id }).populate('patients');
    const patients = hospital.patients;
    const numberOfPatients = patients.length;
    const patientData = getWeeklyData(patients);
    const totalMoney = calculateRaisedMoney(transactions);
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setUTCHours(23, 59, 59, 999);
    const query = {
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
      hospitalId: req.user._id,
    };
    const transactionsToday = await Transaction.find(query);
    const todayTotalMoney = calculateRaisedMoney(transactionsToday);
    const donationsToday = transactionsToday.length;

    const donorData = getWeeklyData(transactions);
    res.status(200).json({
      totalMoney,
      todayTotalMoney,
      donationsToday,
      numberOfPatients,
      patientData,
      donorData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
