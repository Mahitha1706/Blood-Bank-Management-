import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <h1>Blood Bank Management System</h1>
        <p>Admin Dashboard</p>
      </div>
      <div className="dashboard">
        <div className="dashboard-card" onClick={() => navigate('/donors')}>
          <h3>Manage Donors</h3>
          <p>View, add, edit, and delete donor records</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/patients')}>
          <h3>Manage Patients</h3>
          <p>View, add, edit, and delete patient records</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/hospitals')}>
          <h3>Manage Hospitals</h3>
          <p>View, add, edit, and delete hospital records</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
