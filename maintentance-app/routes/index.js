const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

router.get('/', async (req, res) => {
  try {
    const maintenances = await Maintenance.find(); // Assuming you fetch maintenance data from your database
    res.render('index', { maintenances }); // Pass the maintenance data to the EJS file
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
