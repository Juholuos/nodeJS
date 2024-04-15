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
  // const maintenance = await Maintenance.create(req.body);
  try {
    const maintenance = await Maintenance.create(req.body);
    res.status(200).json({ maintenance });
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
    console.log('Nope, ', error);
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

const updateMaintenance = async (req, res) => {
  try {
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
      return res.status(404).json({ msg: 'Huoltoa ei löytynyt' });
    }

    console.log(maintenance);

    res.status(200).json({ maintenance });
  } catch (error) {
    console.error('Virhe päivittäessä huoltoa:', error);
    res.status(500).json({ msg: 'Huollon päivitys ei onnistunut' });
  }
};

module.exports = {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
