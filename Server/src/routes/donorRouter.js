const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const CampaignController = require('../controllers/campaignController');
//=/api/donor

router.post(
  '/register',
  registerController.donorRegister

  // first validator,
  // passport to auth controller
);

router.get('/getcampaigns', CampaignController.getCampaigns);
module.exports = router;
