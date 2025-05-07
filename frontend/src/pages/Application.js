import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Application = () => {
  const [applicantId, setApplicantId] = useState('');
  const [jobId, setJobId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('Pending');
  const [reviewDate, setReviewDate] = useState('');
  const [applications, setApplications] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchApplicants();
    fetchJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/applications');
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err.message);
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/Applicant');
      setApplicants(res.data);
    } catch (err) {
      console.error('Error fetching applicants:', err.message);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobposition');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    }
  };

  const resetForm = () => {
    setApplicantId('');
    setJobId('');
    setApplicationStatus('Pending');
    setReviewDate('');
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ApplicantId: applicantId,
      JobId: jobId,
      ApplicationStatus: applicationStatus,
      ReviewDate: reviewDate,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/applications/${editId}`, payload);
        alert('Application updated!');
      } else {
        await axios.post('http://localhost:5000/api/applications', payload);
        alert('Application submitted!');
      }
      resetForm();
      fetchApplications();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error: ' + (error.response?.data?.error || 'Submission failed.'));
    }
  };

  const handleEdit = (app) => {
    setApplicantId(app.ApplicantId?._id || '');
    setJobId(app.JobId?._id || '');
    setApplicationStatus(app.ApplicationStatus || 'Pending');
    setReviewDate(app.ReviewDate?.substring(0, 10) || '');
    setEditId(app._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
      alert('Application deleted!');
      fetchApplications();
    } catch (err) {
      console.error('Delete error:', err.message);
    }
  };

  return (
    <div>
      <h2>{editId ? 'Edit' : 'Submit'} Job Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Applicant</label>
          <select value={applicantId} onChange={(e) => setApplicantId(e.target.value)} required>
            <option value="">Select Applicant</option>
            {applicants.map((applicant) => (
              <option key={applicant._id} value={applicant._id}>
                {applicant.FirstName} {applicant.LastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Job</label>
          <select value={jobId} onChange={(e) => setJobId(e.target.value)} required>
            <option value="">Select Job</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Application Status</label>
          <select value={applicationStatus} onChange={(e) => setApplicationStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Review Date</label>
          <input type="date" value={reviewDate} onChange={(e) => setReviewDate(e.target.value)} />
        </div>
        <button type="submit">{editId ? 'Update' : 'Submit'}</button>
        {editId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h3>Applications List</h3>
      <table>
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Review Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.ApplicantId?.FirstName} {app.ApplicantId?.LastName}</td>
              <td>{app.JobId?.title}</td>
              <td>{app.ApplicationStatus}</td>
              <td>{app.ReviewDate?.substring(0, 10) || 'N/A'}</td>
              <td>{app.ReviewDate?.substring(0, 10) || 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(app)}>Edit</button>
                <button onClick={() => handleDelete(app._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Application;
