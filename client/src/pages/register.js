import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Assuming you have a CSS file for styling

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/auth/register', form);
            // Handle successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Password"
                    required
                />
                {loading && <div className="loading-spinner">Loading...</div>}
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
