const express = require('express');
const SerialNumber = require('../models/SerialNumber');
const { serialNumberCheck } = require('../services/googleSheets.services');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { serialNumber } = req.body;
    const isExisted = await SerialNumber.find({ serialNumber: serialNumber });
    if (isExisted.length > 0) return res.status(400).send({ message: `${serialNumber} already exists` });
    const created = await SerialNumber.create({ serialNumber: serialNumber, isTaken: false });
    res.status(200).send({ message: `${created.serialNumber} sucssefully created` });
  } catch (error) {
    console.log(error);
    res.statusCode(400).send(error);
  }
});

router.post('/serial-check', async (req, res) => {
  try {
    const { serialNumber, email } = req.body;
    const result = await serialNumberCheck(serialNumber, email);
    if (!result) return res.send({ message: `Serial number not found or already submitted` });
    res.send({ message: `Sucsses` });
  } catch (error) {
    console.log(error);
  }
});

router.get('/get-all', async (req, res) => {
  try {
    const serialNumbers = await SerialNumber.find({});
    res.status(200).send({ message: `Sucsses`, data: serialNumbers });
  } catch (error) {
    console.log(error);
    res.statusCode(400).send(error);
  }
});

module.exports = router;
