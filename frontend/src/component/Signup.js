import React, { useState } from 'react';

function Signup() {
    // State to handle the form data
    const [formdata, setformdata] = useState({
        username: '',
        password: ''
    });

    // Handle input changes
    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted', formdata);

        try {
            // Make an API call to the backend
            const response = await axios.post('http://localhost:5000/api/auth/signup', formdata);

            // Handle successful response
            if (response.status === 201) {
                console.log(response.data.msg); // You can show a success message here
                // Optionally redirect the user or reset the form
            }
        } catch (err) {
            // Handle error (if any)
            console.error('Error during signup:', err);
            if (err.response) {
                // The request was made and the server responded with an error status
                console.error('Error response:', err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received from server');
            } else {
                // Something else happened
                console.error('Error message:', err.message);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1>Registration Form</h1>
            <form className="col-md-6 max-auto" onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formdata.username}
                        onChange={handlechange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formdata.password}
                        onChange={handlechange}
                        required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
