import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for user session
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login if no user session
            navigate('');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear(); // Clear the user session
        navigate('/login');   // Redirect to login
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <>
                   <p>Welcome, <strong>{user.username}</strong>!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
