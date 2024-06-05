const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const fetchController = require('../controllers/fetchController');
const putController = require('../controllers/putController');
//=/api/patient

router.post('/create_campaign', campaignController.createCampaign);
router.post('/createupdate', campaignController.createUpdate);
router.get('/getpatientdashboard', campaignController.getPatientDashboard);
router.get('/getcampaigndetail', campaignController.getCampaignDetailForPatient);
router.get('/getpatientnavdata', fetchController.getPatientNavData);

router.put('/updatepassword', putController.updatePatientPassword);
router.put('/updatepersonaldetails', putController.updatePatientPersonalDetails);
router.put('/updateimage', putController.updatePatientImage);
module.exports = router;
