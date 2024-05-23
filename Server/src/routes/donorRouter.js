const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const CampaignController = require('../controllers/campaignController');
//=/api/donor

router.post('/register', registerController.donorRegister);

router.get('/getcampaigns', CampaignController.getCampaigns);
router.get('/getcampaigndetail/:campaignId', CampaignController.getCampaignDetail);
module.exports = router;
