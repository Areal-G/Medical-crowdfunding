const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');

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
      id,
    });

    await campaign.save();

    await Patient.updateOne({ _id: req.user._id }, { $set: { campaign: campaign._id } });

    res.status(201).json('Saved Successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
