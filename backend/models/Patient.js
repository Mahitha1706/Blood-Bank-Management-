const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bloodType: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  medicalCondition: { type: String, required: true },
  urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High', 'Critical'] },
  requiredBloodUnits: { type: Number, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
