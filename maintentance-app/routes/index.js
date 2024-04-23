const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');
const { getAllMaintenances } = require('../controllers/maintenances');

router.get('/', getAllMaintenances);

module.exports = router;
