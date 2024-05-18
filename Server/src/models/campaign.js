const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  campaignTitle: {
    type: String,
    required: true,
  },
  campaignDescription: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of strings to store image URLs
    required: true,
  },
});

const Campaign = mongoose.model('campaign', CampaignSchema);
module.exports = Campaign;
