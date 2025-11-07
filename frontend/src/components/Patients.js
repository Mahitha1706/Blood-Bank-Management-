import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', bloodType: '', address: '', age: '', gender: '', medicalCondition: '', urgency: '', requiredBloodUnits: '', hospitalId: ''
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPatients();
    fetchHospitals();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hospitals');
      setHospitals(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/patients/${editing}`, form);
        setMessage('Patient updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/patients', form);
        setMessage('Patient added successfully');
      }
      setForm({ name: '', email: '', phone: '', bloodType: '', address: '', age: '', gender: '', medicalCondition: '', urgency: '', requiredBloodUnits: '', hospitalId: '' });
      setEditing(null);
      fetchPatients();
    } catch (err) {
      setMessage('Error saving patient');
    }
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditing(patient._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setMessage('Patient deleted successfully');
      fetchPatients();
    } catch (err) {
      setMessage('Error deleting patient');
    }
  };

  return (
    <div className="container">
      <h2>Manage Patients</h2>
      {message && <div className="success">{message}</div>}
      <div className="card">
        <h3>{editing ? 'Edit Patient' : 'Add New Patient'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Blood Type:</label>
            <select value={form.bloodType} onChange={(e) => setForm({...form, bloodType: e.target.value})} required>
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} required></textarea>
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" value={form.age} onChange={(e) => setForm({...form, age: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Medical Condition:</label>
            <textarea value={form.medicalCondition} onChange={(e) => setForm({...form, medicalCondition: e.target.value})} required></textarea>
          </div>
          <div className="form-group">
            <label>Urgency:</label>
            <select value={form.urgency} onChange={(e) => setForm({...form, urgency: e.target.value})} required>
              <option value="">Select Urgency</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="form-group">
            <label>Required Blood Units:</label>
            <input type="number" value={form.requiredBloodUnits} onChange={(e) => setForm({...form, requiredBloodUnits: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Hospital:</label>
            <select value={form.hospitalId} onChange={(e) => setForm({...form, hospitalId: e.target.value})} required>
              <option value="">Select Hospital</option>
              {hospitals.map(hospital => (
                <option key={hospital._id} value={hospital._id}>{hospital.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'} Patient</button>
          {editing && <button type="button" className="btn" onClick={() => {setEditing(null); setForm({ name: '', email: '', phone: '', bloodType: '', address: '', age: '', gender: '', medicalCondition: '', urgency: '', requiredBloodUnits: '', hospitalId: '' });}}>Cancel</button>}
        </form>
      </div>
      <div className="card">
        <h3>Patient List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Blood Type</th>
              <th>Urgency</th>
              <th>Hospital</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.bloodType}</td>
                <td>{patient.urgency}</td>
                <td>{patient.hospitalId?.name}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(patient)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(patient._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
