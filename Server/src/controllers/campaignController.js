const Campaign = require('../models/campaign');
const Patient = require('../models/patient');

exports.createCampaign = async (req, res, next) => {
  try {
    const data = req.body;
    const campaign = new Campaign(data);
    await campaign.save();

    await Patient.updateOne({ _id: req.user._id }, { $set: { campaign: campaign._id } });
    res.status(201).json('Saved succesfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
