const express = require('express');
const router = express.Router();

const {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  deleteMaintenance,
  updateMaintenance,

  renderMaintenancePage,
} = require('../controllers/maintenances');

router.get('/:id', renderMaintenancePage);
router.delete('/:id', deleteMaintenance); // Delete a specific maintenance record
router.patch('/:id', updateMaintenance); // Update a specific maintenance record
router.get('/', getAllMaintenances); // Retrieve all maintenance records
router.post('/', createMaintenance); // Create a new maintenance record

router.route('/').get(getAllMaintenances).post(createMaintenance);

module.exports = router;
