const express = require('express');
const router = express.Router();

// const getAllMaintenances = require('../controllers/maintenances');

const {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  deleteMaintenance,
  updateMaintenance,
} = require('../controllers/maintenances');

router.route('/').get(getAllMaintenances).post(createMaintenance);
router
  .route('/:id')
  .get(getMaintenance)
  .delete(deleteMaintenance)
  .patch(updateMaintenance);

module.exports = router;
