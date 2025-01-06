import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './pages/register.js';
import Login from './pages/login.js';
import './App.css'; // Assuming you have a CSS file for global styling

const App = () => (
    <Router>
        <div className="app-container">
            <nav className="nav-bar">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    </Router>
);

export default App;
