const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// POST /api/requests → add new blood request
router.post('/', async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json({ message: 'Blood request added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add request' });
  }
});

// GET /api/requests → get all blood requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

module.exports = router;
