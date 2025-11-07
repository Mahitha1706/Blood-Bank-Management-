const express = require('express');
const Hospital = require('../models/Hospital');
const router = express.Router();

// GET /api/hospitals - Get all hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/hospitals/:id - Get single hospital
router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/hospitals - Create new hospital
router.post('/', async (req, res) => {
  const hospital = new Hospital(req.body);
  try {
    const newHospital = await hospital.save();
    res.status(201).json(newHospital);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/hospitals/:id - Update hospital
router.put('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/hospitals/:id - Delete hospital
router.delete('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json({ message: 'Hospital deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
