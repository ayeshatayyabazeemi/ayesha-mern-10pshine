import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user?.id);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const displayName =
    user?.username.charAt(0).toUpperCase() + user?.username.slice(1);

  const addNote = () => {
    navigate('/add-note');
  };




  return (
  <div className="dashboard">
    <div className="background" />

    {/* Header */}
    <div className="dashboard-header">
      <h2 className="username">
        <span className="line1">{displayName}'s</span><br />
        <span className="line2">NotesApp</span>
      </h2>

      <div className="search-bar-wrapper">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search notes..." />
        </div>
      </div>

      <button onClick={addNote} className="add-note-button">+ Note</button>
    </div>

  </div>
);

};

export default Dashboard;
