const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const campaignController = require('../controllers/campaignController');
const fetchController = require('../controllers/fetchController');
const putController = require('../controllers/putController');

//=/api/sysadmin

router.post('/register', registerController.hospitalRegister);
router.get('/getadmindashboard', campaignController.getAdminDashboard);
router.get('/gethospitalstable', fetchController.getHospitalsTable);
router.put('/updatehospitalstatus/:id', putController.updateHospitalStatus);
router.get('/getdonorstable', fetchController.getDonorsTable);
router.put('/updatedonorstatus/:id', putController.updateDonorStatus);
router.get('/getpatientstable', fetchController.getPatientsTable);
router.put('/updatepatientstatus/:id', putController.updatePatientStatus);
router.get('/getcampaignstable', fetchController.getCampaignsTable);
router.put('/updatecampaignstatus/:id', putController.updateCampaignStatus);
router.get('/getadminnavdata', fetchController.getAdminNavData);
router.get('/getdonordataforadmin/:id', fetchController.getDonorDataForAdmin);
router.get('/getpatientdataforadmin/:id', fetchController.getPatientDataForAdmin);
router.get('/gethospitaldataforadmin/:id', fetchController.getHospitalDataForAdmin);
router.get('/getcampaigndetail/:campaignId', campaignController.getCampaignDetailForDonor);

module.exports = router;
