const Maintenance = require('../models/Maintenance');
const User = require('../models/User');
const dayjs = require('dayjs');

const getAllMaintenances = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.log('Ei ole req.useria');
      throw new Error('Invalid user data');
    }
    console.log('user: ', req.user);
    // Haetaan kaikki huollot tietokannasta
    const maintenances = await Maintenance.find({ user: req.user.id }).sort({
      maintenanceDate: -1,
    });

    res.render('index', { maintenances, username: req.user.username }); // Pass the maintenance data to the EJS file
    // res.status(200).json({ maintenances }); // thunder client
  } catch (error) {
    // Käsitellään virheet, jos sellaisia tulee
    console.error('Virhe haettaessa huoltoja tietokannasta:', error);
    throw new Error('Huoltojen hakeminen epäonnistui');
  }
};

const createMaintenance = async (req, res) => {
  try {
    if (
      !req.body.carMake ||
      !req.body.carModel ||
      !req.body.maintenanceDate ||
      !req.body.mileage
    ) {
      return res.status(400).send('Required fields are missing');
    }

    const newMaintenance = new Maintenance({
      carMake: req.body.carMake,
      carModel: req.body.carModel,
      maintenanceDate: req.body.maintenanceDate,
      mileage: req.body.mileage,
      details: req.body.details,
      user: req.user.id,
    });
    const maintenance = await newMaintenance.save();

    req.flash('success', 'Huolto lisätty onnistuneesti!');

    res.status(200).redirect(`/`);
    // res.status(200).json({ maintenance }); // Thunder Clientille
  } catch (error) {
    // Käsitellään virheet, jos sellaisia tulee
    console.error('Virhe lisättäessä huoltoa:', error);
    req.flash('error', 'Virhe lisättäessä huoltoa.');
    res.redirect('/');
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
    res.status(200).json({ message: 'Maintenance deleted successfully' });
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
  req.flash('success', 'Huolto päivitetty onnistuneesti!');
  res.status(200).json({ maintenance });
};

const renderMaintenancePage = async (req, res) => {
  try {
    const maintenanceID = req.params.id;
    const maintenance = await Maintenance.findById(maintenanceID);
    if (!maintenance) {
      return res.status(404).send('Maintenance not found!');
    }

    const formattedDate = dayjs(maintenance.maintenanceDate).format(
      'YYYY-MM-DD'
    );
    console.log(req.user);
    res.render('updateMaintenance', {
      maintenance,
      formattedDate,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,

  renderMaintenancePage,
};
