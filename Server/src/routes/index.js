const { Router } = require('express');
const authRouter = require('./authRouter.js');

const router = Router();

router.use('/auth', authRouter);
// router.use('/donor', donorRouter);
// router.use('/patient', patienRouter);
// router.use('/systemadmin', systmeAdminRouter);
// router.use('/hospitaladmin', hospitalAdminRouter);

module.exports = router;

// if routing doesnt work look at the export and then the main index router import and app use
