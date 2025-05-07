const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  bloodType: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);

