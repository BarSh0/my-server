const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  name: String,
  email: String,
  serialNumber: String,
  isGotGift: Boolean,
  formData: Array,
});

const Entry = mongoose.model('entries', EntrySchema);

module.exports = Entry;
