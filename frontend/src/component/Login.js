import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            // Check for user data in response
            if (response.data.user) {
                // Store the user in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                setSuccessMessage('Login successful!');
                setFormData({ username: '', password: '' });

                // Redirect after short delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setError(response.data.msg || 'Login failed');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Server error. Try again.');
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default Login;
