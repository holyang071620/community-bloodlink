const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const Request = require('../models/Request');

router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find({}, 'bloodType');
    const requests = await Request.find({}, 'bloodType');

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // Normalize donors
    const normalizedDonors = donors.map(d => {
      return {
        ...d._doc,
        bloodType: d.bloodType === 'O' ? 'O+' : d.bloodType
      };
    });

    // Normalize requests
    const normalizedRequests = requests.map(r => {
      return {
        ...r._doc,
        bloodType: r.bloodType === 'O' ? 'O+' : r.bloodType
      };
    });

    const donorCounts = bloodTypes.map(
      type => normalizedDonors.filter(d => d.bloodType === type).length
    );

    const requestCounts = bloodTypes.map(
      type => normalizedRequests.filter(r => r.bloodType === type).length
    );

    res.json({
      totalDonors: donors.length,
      totalRequests: requests.length,
      bloodTypes,
      donorCounts,
      requestCounts
    });
  } catch (err) {
    console.error('❌ Error in /api/stats:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
