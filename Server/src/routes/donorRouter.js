const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const CampaignController = require('../controllers/campaignController');
const fetchController = require('../controllers/fetchController');
//=/api/donor

router.post('/register', registerController.donorRegister);

router.get('/getcampaigns', CampaignController.getCampaigns);
router.get('/getcampaigndetail/:campaignId', CampaignController.getCampaignDetailForDonor);
router.get('/getdonornavdata', fetchController.getDonorNavData);
module.exports = router;
