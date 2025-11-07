const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// GET /api/patients - Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().populate('hospitalId');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/patients/:id - Get single patient
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('hospitalId');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/patients - Create new patient
router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/patients/:id - Update patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/patients/:id - Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
