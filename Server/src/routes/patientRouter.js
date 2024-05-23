const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
//=/api/patient

router.post('/create_campaign', campaignController.createCampaign);
module.exports = router;
