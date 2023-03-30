const mongoose = require('mongoose');

const SerialNumberSchema = new mongoose.Schema({
  serialNumber: String,
  isTaken: Boolean,
});

const SerialNumber = mongoose.model('serial-numbers', SerialNumberSchema);

module.exports = SerialNumber;
