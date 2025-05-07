const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Create a new donor
router.post('/', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all donors
router.get('/', async (req, res) => {
  const donors = await Donor.find().sort({ createdAt: -1 });
  res.json(donors);
});

// Search donors by blood type and location
router.get('/search', async (req, res) => {
  const { bloodType, location } = req.query;
  const query = {};
  if (bloodType) query.bloodType = bloodType;
  if (location) query.location = new RegExp(location, 'i');
  try {
    const donors = await Donor.find(query);
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
});

// Update donor info
router.put('/:id', async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete donor
router.delete('/:id', async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ message: 'Donor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
