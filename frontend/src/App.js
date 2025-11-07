import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Donors from './components/Donors';
import Patients from './components/Patients';
import Hospitals from './components/Hospitals';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/donors" element={isLoggedIn ? <Donors /> : <Navigate to="/login" />} />
          <Route path="/patients" element={isLoggedIn ? <Patients /> : <Navigate to="/login" />} />
          <Route path="/hospitals" element={isLoggedIn ? <Hospitals /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
