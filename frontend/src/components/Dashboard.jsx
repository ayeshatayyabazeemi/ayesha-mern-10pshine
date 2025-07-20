import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import NoteCard from './NoteCard';

const Dashboard = () => {
  const  user  = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  console.log(user.id);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const displayName =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  const addNote = () => {
    navigate('/add-note');
  };


  
  useEffect(() => {
  const fetchNotes = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (!token || !user.id) {
      console.warn('Missing token or user ID');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/note/read?user=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('result'+res);
      setNotes(res.data.notes || []);
      console.log(res.data.notes);
      console.log(notes);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  if (user.username) fetchNotes();
}, []);








  return (
    <div className='page-wrapper'> 
     <div className="background" />
  <div className="dashboard">
   

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
   
<div className="notes-container">
  {notes.length > 0 ? (
    notes.map((note) => 
   <NoteCard
  key={note._id}
  note={note}
 
 
/>)
  ) : (
    <p className="no-notes">No notes to display.</p>
  )}
</div>

 </div>
</div>

);

};

export default Dashboard;
