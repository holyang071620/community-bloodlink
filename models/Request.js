const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  urgency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
