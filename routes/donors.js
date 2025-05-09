const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Create a new donor
router.post('/', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    console.log('✅ Donor created:', donor);
    res.status(201).json(donor);
  } catch (err) {
    console.error('❌ Error creating donor:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 }).lean();
    res.json(donors);
  } catch (err) {
    console.error('❌ Error fetching donors:', err.message);
    res.status(500).json({ message: 'Failed to get donors' });
  }
});

// Search donors by blood type and location
router.get('/search', async (req, res) => {
  const { bloodType, location } = req.query;
  const query = {};
  if (bloodType) query.bloodType = bloodType;
  if (location) query.location = new RegExp(location, 'i');
  try {
    const donors = await Donor.find(query).lean();
    res.json(donors);
  } catch (err) {
    console.error('❌ Error searching donors:', err.message);
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
    console.error('❌ Error updating donor:', err.message);
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
    console.error('❌ Error deleting donor:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
