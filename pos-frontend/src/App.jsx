// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua halaman
import POSPage from './presentation/pages/POSpage';
import LoginPage from './presentation/pages/LoginPage';
import AdminPage from './presentation/pages/AdminPage'; // 👈 Tambahkan ini

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<POSPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* 👈 Tambahkan rute khusus Admin ini */}
        <Route path="/admin" element={<AdminPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;