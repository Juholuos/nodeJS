const Maintenance = require('../models/Maintenance');

const getAllMaintenances = async (req, res) => {
  try {
    // Haetaan kaikki huollot tietokannasta
    const maintenances = await Maintenance.find();

    res.status(200).json({ maintenances });
  } catch (error) {
    // Käsitellään virheet, jos sellaisia tulee
    console.error('Virhe haettaessa huoltoja tietokannasta:', error);
    throw new Error('Huoltojen hakeminen epäonnistui');
  }
};

const createMaintenance = async (req, res) => {
  try {
    console.log(req.body);
    const newMaintenance = new Maintenance({
      carMake: req.body.carMake,
      carModel: req.body.carModel,
      maintenanceDate: req.body.maintenanceDate,
      mileage: req.body.mileage,
      details: req.body.details,
    });
    const maintenance = await newMaintenance.save();

    res.status(200).redirect(`/`);
  } catch (error) {
    // Käsitellään virheet, jos sellaisia tulee
    console.error('Virhe lisättäessä huoltoa:', error);
    throw new Error('Huollon lisääminen ei onnistunut');
  }
};

const getMaintenance = async (req, res) => {
  try {
    const { id: maintenanceID } = req.params;
    const maintenance = await Maintenance.findOne({ _id: maintenanceID });
    if (!maintenance) {
      return res
        .status(404)
        .json({ error: `Ei huoltoa jonka ID: ${maintenanceID}` });
    }
    res.status(200).json({ maintenance });
  } catch (error) {
    console.log(error);
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    const { id: maintenanceID } = req.params;
    const maintenance = await Maintenance.findOneAndDelete({
      _id: maintenanceID,
    });
    res.status(200).json({});
  } catch (error) {
    console.error('Virhe poistaessa huoltoa:', error);
    throw new Error('Huollon poistaminen ei onnistunut');
  }
};

const updateMaintenance = async (req, res, next) => {
  const { id: maintenanceID } = req.params;

  const maintenance = await Maintenance.findOneAndUpdate(
    { _id: maintenanceID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!maintenance) {
    return res
      .status(404)
      .json({ msg: `Huoltoa ei löytynyt, ID ${maintenanceID}` });
  }

  res.status(200).json({ maintenance });
};

module.exports = {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
