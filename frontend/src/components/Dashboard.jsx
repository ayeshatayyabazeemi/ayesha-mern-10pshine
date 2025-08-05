import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import NoteCard from './NoteCard';
import {BASE_URL } from '../config.js';
import {FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
   const [searchnote, setSearchnote] = useState('');
   const [suggestions, setSuggestions] = useState([]);
  const  user  = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const displayName =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  const addNote = () => {
    navigate('/add-note');
  };

  
  const handleLogout = () => {
    localStorage.clear(); // clear all local storage
    navigate("/"); // navigate to AuthForm
  };



  
  useEffect(() => {
  const fetchNotes = async () => {
    const token = localStorage.getItem('jwtToken');
 
    if (!token || !user.id) {
      console.warn('Missing token or user ID');
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/api/note/read?user=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('result'+res);
      setNotes(res.data.notes || []);
    
      console.log(refreshKey)
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  if (user.username) fetchNotes();
}, [refreshKey]);


const debouncedSearch = async () => {
  const token = localStorage.getItem('jwtToken');
  try {
    const res = await axios.get(`${BASE_URL}/api/note/search?query=${searchnote}&user=${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setNotes(res.data || []);
  } catch (err) {
    console.error('Debounced search failed:', err);
  }
};



const search=async()=>{
   await debouncedSearch(); 
};




useEffect(() => {
 

  const timer = setTimeout(() => {
    if (!searchnote.trim()) {
     setRefreshKey(prev => prev + 1);
    } else {
    debouncedSearch();
    }
  }, 400);

  return () => clearTimeout(timer);
}, [searchnote]);



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
          <input value={searchnote}   onChange={(e) => setSearchnote(e.target.value)}
            placeholder="Search notes..." />
        </div>
       

      </div>

      <div className="header-right">
    <button onClick={addNote} className="add-note-button">+ Note</button>
    <button onClick={handleLogout} className="logout-button" title="Logout">
      <FiLogOut size={30} />
    </button>
  </div>
    </div>
    
 
   
<div className="notes-container">
  {notes.length > 0 ? (
    notes.map((note) => 
   <NoteCard
  key={note._id}
  note={note}
 onDeleteSuccess={ ()=>setRefreshKey(prev => prev + 1)} 
 
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


