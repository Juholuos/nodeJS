const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  carMake: {
    type: String,
    required: [true, 'Syötä auton merkki'],
    trim: true,
    maxlength: [50, 'Auton merkki on oltava enintään 50 merkkiä'],
  },
  carModel: {
    type: String,
    required: [true, 'Syötä auton malli'],
    trim: true,
    maxlength: [50, 'Auton malli on oltava enintään 50 merkkiä'],
  },
  maintenanceDate: {
    type: Date,
    required: [true, 'Anna huoltopäivämäärä'],
  },
  mileage: {
    type: Number,
    required: [true, 'Anna auton kilometrimäärä huollon ajankohtana'],
    min: [0, 'Kilometrimäärä ei voi olla negatiivinen'],
  },
  details: {
    type: String,
    required: [true, 'Anna huollon tiedot'],
    trim: true,
    maxlength: [500, 'Huollon tiedot voi olla enintään 500 merkkiä pitkä'],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
