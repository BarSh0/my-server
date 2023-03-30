const SerialNumber = require('../models/SerialNumber');

const validateSerialNumber = async (req, res, next) => {
  const { number } = req.body;
  try {
    const serialNumber = await SerialNumber.find({ number });
    if (!serialNumber) res.status(404).send(`Invalid serial number`);
    if (!serialNumber.isTaken) res.status(404).send(`This serial number is Already in use`);
    res.status(200).send(`${serialNumber} send successfully!`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  validateSerialNumber,
};
