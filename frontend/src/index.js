import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Keep or remove depending on your setup
import App from './App';
import { AuthProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);