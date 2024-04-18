const { Router } = require("express");
const usersRouter = require("./users.js");

const router = Router();

router.use(usersRouter);

module.exports = router;
