const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  campaignTitle: {
    en: {
      type: String,
      required: true,
    },
    am: {
      type: String,
      required: true,
    },
  },
  campaignDescription: {
    en: {
      type: String,
      required: true,
    },
    am: {
      type: String,
      required: true,
    },
  },
  target: {
    type: Number,
    required: true,
  },
  campaignDate: {
    type: Date,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model('campaign', CampaignSchema);
module.exports = Campaign;
