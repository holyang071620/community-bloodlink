const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const Request = require('../models/Request');

router.get('/stats', async (req, res) => {
  const totalDonors = await Donor.countDocuments();
  const totalRequests = await Request.countDocuments();

  const bloodTypeCounts = await Donor.aggregate([
    { $group: { _id: '$bloodType', count: { $sum: 1 } } }
  ]);

  res.json({
    totalDonors,
    totalRequests,
    bloodTypeCounts
  });
});

module.exports = router;
