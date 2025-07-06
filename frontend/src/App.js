import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard'


function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" autoClose={2000} />

        <Routes>

          <Route path="/" element={<AuthForm />} />

         
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/changepassword" element={<ChangePassword />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
