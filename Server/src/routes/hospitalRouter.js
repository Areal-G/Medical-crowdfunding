const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const fetchController = require('../controllers/fetchController');
const campaignController = require('../controllers/campaignController');
const putController = require('../controllers/putController');
//= /api/hospital

router.post('/register', registerController.patientRegister);
router.post('/createaccount', registerController.hospitalCreateAccount);
router.get('/gethospitaldashboard', campaignController.getHospitalDashboard);
router.get('/getpatientstableinhospital', fetchController.getPatientsTableInHospital);
router.get('/getcampaignstableinhospital', fetchController.getCampaignsTableInHospital);
router.put('/updatecampaignstatusinhospital/:id', putController.updateCampaignStatus);
router.get('/gethospitalnavdata', fetchController.getHospitalNavData);
router.get('/getcampaigndetail/:campaignId', campaignController.getCampaignDetailForDonor);
router.get('/getpatientdataforhospital/:id', fetchController.getPatientDataForAdmin);

router.put('/updatepassword', putController.updateHospitalPassword);
router.put('/updatepersonaldetails', putController.updateHospitalPersonalDetails);
router.put('/updateimage', putController.updateHospitalImage);

router.get('/isaccountnew', fetchController.getIsHospitalAccountNew);

module.exports = router;
