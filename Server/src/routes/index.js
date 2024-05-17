const { Router } = require('express');
const authRouter = require('./authRouter.js');
const donorRouter = require('./donorRouter.js');
const patienRouter = require('./patientRouter.js');
const sysAdminRouter = require('./sysAdminRouter.js');
const hospitalRouter = require('./hospitalRouter.js');
const { ensureAuthenticated } = require('../middlewares/authMiddleware.js');

const router = Router();

router.use('/auth', authRouter);
router.use('/donor', donorRouter);
router.use('/patient', patienRouter);
router.use('/sysadmin', sysAdminRouter);
router.use('/hospital', hospitalRouter);
router.get('/current_user', ensureAuthenticated, (req, res) => {
  res.json({ role: req.user.role });
});

module.exports = router;

// if routing doesnt work look at the export and then the main index router import and app use
