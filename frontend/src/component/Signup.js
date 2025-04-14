import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    // State to handle the form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const[submit, setSubmit]=useState();

    // State to handle loading and error messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Stop the page from refreshing
        setLoading(true);
        setError('');
        setSuccessMessage('');
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
        console.log(response.data); 
        setSuccessMessage('User registered successfully!');
        setFormData({ username: '', password: '' }); 

        setTimeout(() => {
            navigate('/login');
        }, 1000);

  };
    

    return (
        <div>
            <h1>Signup</h1>
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
                <button type="submit" disabled={loading} onClick={handleSubmit}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
            </form>

            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default Signup;
