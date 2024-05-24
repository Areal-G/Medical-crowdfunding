const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');
const Transaction = require('../models/transaction');

exports.createCampaign = async (req, res, next) => {
  try {
    const hospital = await Hospital.findOne({ patients: req.user._id });
    if (!hospital) {
      res.status(404).json({ error: 'Hospital not found for patient' });
      return;
    }

    console.log('hi');
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

exports.getCampaignDetail = async (req, res, next) => {
  const { campaignId } = req.params;
  try {
    const campaign = await Campaign.findOne({ _id: campaignId }).populate('hospital');
    const deadlineDate = Math.ceil(
      (campaign.campaignDate - campaign.createdAt) / (1000 * 60 * 60 * 24)
    );
    let raisedMoney = 0;
    let Money = 0;
    const transactions = await Transaction.find({ campaignId }).populate('donorId');
    transactions.forEach((transaction) => {
      let exchangeRate = transaction.currency === 'usd' ? transaction.amount * 57.5071 : 1;

      Money += transaction.amount * exchangeRate;
      raisedMoney = Math.ceil(Money);
    });
    let donations = 0;
    donations = transactions.length;
    let raisedPercent = 0;
    raisedPercent = Math.ceil(raisedMoney / campaign.target) * 100;
    res
      .status(200)
      .json({
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
