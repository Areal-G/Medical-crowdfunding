const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const fetchController = require('../controllers/fetchController');
//=/api/patient

router.post('/create_campaign', campaignController.createCampaign);
router.post('/createupdate', campaignController.createUpdate);
router.get('/getpatientdashboard', campaignController.getPatientDashboard);
router.get('/getcampaigndetail', campaignController.getCampaignDetailForPatient);
router.get('/getpatientnavdata', fetchController.getPatientNavData);
module.exports = router;
