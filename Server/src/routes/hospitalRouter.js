const express = require('express');
const router = express.Router();
//= /api/hospital

router.get('/halo', (req, res) => {
  console.log("Hi, it's me");
  res.send("Hi, it's me");
});

module.exports = router;
