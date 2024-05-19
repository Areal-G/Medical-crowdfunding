const Hospital = require('../models/hospital');
const Campaign = require('../models/campaign');
const Patient = require('../models/patient');

exports.createCampaign = async (req, res, next) => {
  try {
    //Find the hospital that the patient is associated with
    const hospital = await Hospital.findOne({ patients: req.user._id });
    if (!hospital) {
      res.status(404).json({ error: 'Hospital not found for patient' });
      return;
    }

    // Create new campaign with the hospital id.
    const campaign = new Campaign({
      ...req.body,
      hospital: hospital._id, // Here use the hospital object id
    });

    await campaign.save();

    //  Update the patient with the campaign id
    await Patient.updateOne({ _id: req.user._id }, { $set: { campaign: campaign._id } });

    res.status(201).json('Saved Successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
