const dayjs = require('dayjs');

const formatMaintenanceDate = (req, res, next) => {
  if (req.body.maintenanceDate) {
    // Format the date string to "DD-MM-YYYY"
    const formattedDate = dayjs(
      req.body.maintenanceDate,
      'DD-MM-YYYY'
    ).toDate();
    console.log(formattedDate);
    // Update the request body with the formatted date object
    req.body.maintenanceDate = formattedDate;
  }
  next();
};

module.exports = formatMaintenanceDate;
