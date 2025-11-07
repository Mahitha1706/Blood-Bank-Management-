const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Hardcoded admin credentials for simplicity
const ADMIN_EMAIL = 'admin@bloodbank.com';
const ADMIN_PASSWORD = 'admin123';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ message: 'Login successful', user: { email, role: 'admin' } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
