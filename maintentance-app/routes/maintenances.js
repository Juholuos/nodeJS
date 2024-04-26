const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/jwtAuth');

const {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  deleteMaintenance,
  updateMaintenance,
  renderMaintenancePage,
} = require('../controllers/maintenances');

// Render maintenance page
router.get('/:id', renderMaintenancePage);

// Retrieve, update, and delete a specific maintenance record
router
  .route('/:id')
  .get(getMaintenance)
  .patch(updateMaintenance)
  .delete(deleteMaintenance);

// Retrieve all maintenance records and create a new maintenance record
router.route('/').get(getAllMaintenances).post(createMaintenance);

module.exports = router;
