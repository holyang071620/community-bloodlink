const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const Request = require('../models/Request');

router.get('/', async (req, res) => {
  try {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const donorCountsRaw = await Donor.aggregate([
      { $group: { _id: '$bloodType', count: { $sum: 1 } } }
    ]);

    const requestCountsRaw = await Request.aggregate([
      { $group: { _id: '$bloodType', count: { $sum: 1 } } }
    ]);

    const donorCountsMap = donorCountsRaw.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const requestCountsMap = requestCountsRaw.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const donorCounts = bloodTypes.map(bt => donorCountsMap[bt] || 0);
    const requestCounts = bloodTypes.map(bt => requestCountsMap[bt] || 0);

    res.json({
      totalDonors: donorCountsRaw.reduce((sum, item) => sum + item.count, 0),
      totalRequests: requestCountsRaw.reduce((sum, item) => sum + item.count, 0),
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
