import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import Welcome from './pages/Welcome';
import Signup from './component/Signup';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Job_Position from './pages/Job_Position';
import Applicant from './pages/Applicant';
import Application from './pages/Application';
import Recruitmant_Stage from './pages/Recruitment_Stage';
import Report from './pages/Report';




function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobpositions" element={<Job_Position />} />
        <Route path="/applicants" element={<Applicant />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/recruitmentstages" element={<Recruitmant_Stage />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
}

export default App;
