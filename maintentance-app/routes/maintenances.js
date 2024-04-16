const express = require('express');
const router = express.Router();

const {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  deleteMaintenance,
  updateMaintenance,
} = require('../controllers/maintenances');

router
  .route('/:id')
  .get(getMaintenance)
  .delete(deleteMaintenance)
  .patch(updateMaintenance);

router.route('/').get(getAllMaintenances).post(createMaintenance);

router.get('/', (req, res) => {
  res.render('index.ejs');
});

module.exports = router;