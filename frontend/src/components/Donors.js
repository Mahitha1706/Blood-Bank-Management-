import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', bloodType: '', address: '', age: '', gender: '', medicalHistory: ''
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donors');
      setDonors(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/donors/${editing}`, form);
        setMessage('Donor updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/donors', form);
        setMessage('Donor added successfully');
      }
      setForm({ name: '', email: '', phone: '', bloodType: '', address: '', age: '', gender: '', medicalHistory: '' });
      setEditing(null);
      fetchDonors();
    } catch (err) {
      setMessage('Error saving donor');
    }
  };

  const handleEdit = (donor) => {
    setForm(donor);
    setEditing(donor._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/donors/${id}`);
      setMessage('Donor deleted successfully');
      fetchDonors();
    } catch (err) {
      setMessage('Error deleting donor');
    }
  };

  return (
    <div className="container">
      <h2>Manage Donors</h2>
      {message && <div className="success">{message}</div>}
      <div className="card">
        <h3>{editing ? 'Edit Donor' : 'Add New Donor'}</h3>
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
            <label>Medical History:</label>
            <textarea value={form.medicalHistory} onChange={(e) => setForm({...form, medicalHistory: e.target.value})}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'} Donor</button>
          {editing && <button type="button" className="btn" onClick={() => {setEditing(null); setForm({ name: '', email: '', phone: '', bloodType: '', address: '', age: '', gender: '', medicalHistory: '' });}}>Cancel</button>}
        </form>
      </div>
      <div className="card">
        <h3>Donor List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Blood Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(donor => (
              <tr key={donor._id}>
                <td>{donor.name}</td>
                <td>{donor.email}</td>
                <td>{donor.phone}</td>
                <td>{donor.bloodType}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(donor)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(donor._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donors;
