import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to our software system</h1>
      <p>Please signup or login to continue</p>
      <div>
        <button onClick={() => navigate('/signup')}>Signup</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Welcome;
