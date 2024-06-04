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
  update: {
    en: {
      type: String,
    },
    am: {
      type: String,
    },
  },
  updateImages: {
    type: [String],
  },
  isUpdate: {
    type: Boolean,
    default: false,
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
  status: {
    type: String,
    enum: ['active', 'pending', 'rejected', 'closed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = Campaign;
