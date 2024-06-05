const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const CampaignController = require('../controllers/campaignController');
const fetchController = require('../controllers/fetchController');
const putController = require('../controllers/putController');
//=/api/donor

router.post('/register', registerController.donorRegister);

router.get('/getcampaigns', CampaignController.getCampaigns);
router.get('/getcampaigndetail/:campaignId', CampaignController.getCampaignDetailForDonor);
router.get('/getdonornavdata', fetchController.getDonorNavData);
router.get('/mydonations', fetchController.myDonations);
router.put('/updatepassword', putController.updateDonorPassword);
router.put('/updatepersonaldetails', putController.updateDonorPersonalDetails);

router.put('/updateimage', putController.updateDonorImage);
module.exports = router;
