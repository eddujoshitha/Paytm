import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('/api/auth/login', form);
            localStorage.setItem('token', data.token);
            // Handle successful login
        } catch (err) {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
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
                <div className="remember-me">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={form.rememberMe}
                        onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                {loading && <div className="loading-spinner">Loading...</div>}
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
