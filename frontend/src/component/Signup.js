import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    // State to handle the form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

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
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

      const submitForm = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/signup", formData)
        .then((response)=>{
           console.log('user added')
          })
    
          .catch((error)=>{
            console.log(error)
          })
    };
}

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
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
            </form>

            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default Signup;
