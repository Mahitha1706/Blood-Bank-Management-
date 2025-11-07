const express = require('express');
const Donor = require('../models/Donor');
const router = express.Router();

// GET /api/donors - Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/donors/:id - Get single donor
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/donors - Create new donor
router.post('/', async (req, res) => {
  const donor = new Donor(req.body);
  try {
    const newDonor = await donor.save();
    res.status(201).json(newDonor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/donors/:id - Update donor
router.put('/:id', async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/donors/:id - Delete donor
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
