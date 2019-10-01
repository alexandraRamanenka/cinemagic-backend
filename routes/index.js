const express = require('express');
let router = express.Router();

router.use('/', (req, res) => {
  res.send('Welcome to Cinemagic!');
});

module.exports = router;
