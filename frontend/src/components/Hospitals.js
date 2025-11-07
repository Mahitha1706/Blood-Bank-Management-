import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', contactPerson: '', licenseNumber: ''
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHospitals();
  }, []);

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
        await axios.put(`http://localhost:5000/api/hospitals/${editing}`, form);
        setMessage('Hospital updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/hospitals', form);
        setMessage('Hospital added successfully');
      }
      setForm({ name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', contactPerson: '', licenseNumber: '' });
      setEditing(null);
      fetchHospitals();
    } catch (err) {
      setMessage('Error saving hospital');
    }
  };

  const handleEdit = (hospital) => {
    setForm(hospital);
    setEditing(hospital._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hospitals/${id}`);
      setMessage('Hospital deleted successfully');
      fetchHospitals();
    } catch (err) {
      setMessage('Error deleting hospital');
    }
  };

  return (
    <div className="container">
      <h2>Manage Hospitals</h2>
      {message && <div className="success">{message}</div>}
      <div className="card">
        <h3>{editing ? 'Edit Hospital' : 'Add New Hospital'}</h3>
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
            <label>Address:</label>
            <textarea value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} required></textarea>
          </div>
          <div className="form-group">
            <label>City:</label>
            <input type="text" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input type="text" value={form.state} onChange={(e) => setForm({...form, state: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input type="text" value={form.zipCode} onChange={(e) => setForm({...form, zipCode: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Contact Person:</label>
            <input type="text" value={form.contactPerson} onChange={(e) => setForm({...form, contactPerson: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>License Number:</label>
            <input type="text" value={form.licenseNumber} onChange={(e) => setForm({...form, licenseNumber: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'} Hospital</button>
          {editing && <button type="button" className="btn" onClick={() => {setEditing(null); setForm({ name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', contactPerson: '', licenseNumber: '' });}}>Cancel</button>}
        </form>
      </div>
      <div className="card">
        <h3>Hospital List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Contact Person</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(hospital => (
              <tr key={hospital._id}>
                <td>{hospital.name}</td>
                <td>{hospital.email}</td>
                <td>{hospital.phone}</td>
                <td>{hospital.city}</td>
                <td>{hospital.contactPerson}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(hospital)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(hospital._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hospitals;
