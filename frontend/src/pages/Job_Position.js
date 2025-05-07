import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function Job_Position() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', department: '', description: '', requiredQualifications: '' });
  const [editingJob, setEditingJob] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobposition');
      setJobs(res.data);
    } catch (err) {
      console.error('Fetch error:', err.message);
      alert('Failed to load jobs. Check backend and route.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        // Update
        await axios.put(`http://localhost:5000/api/jobposition/${editingJob._id}`, form);
        setEditingJob(null);
      } else {
        // Create
        await axios.post('http://localhost:5000/api/jobposition', form);
      }
      setForm({ title: '', department: '', description: '', requiredQualifications: '' });
      fetchJobs();
      setModalIsOpen(false); // Close modal after submit
    } catch (err) {
      console.error('Submit error:', err.message);
      alert('Error submitting form');
    }
  };

  const handleEdit = (job) => {
    setForm(job);
    setEditingJob(job);
    setModalIsOpen(true); // Open modal on Edit
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://localhost:5000/api/jobposition/${id}`);
        fetchJobs();
      } catch (err) {
        console.error('Delete error:', err.message);
        alert('Failed to delete');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Job Positions</h2>

      {/* Job Position Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="requiredQualifications" value={form.requiredQualifications} onChange={handleChange} placeholder="Qualifications" required />
        <button type="submit">{editingJob ? 'Update' : 'Add'}</button>
      </form>

      {/* Jobs Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Description</th>
            <th>Qualifications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.department}</td>
              <td>{job.description}</td>
              <td>{job.requiredQualifications}</td>
              <td>{job.requiredQualifications}</td>
              <td><button onClick={() => handleEdit(job)}>Edit</button><button onClick={() => handleDelete(job._id)} style={{ marginLeft: '5px' }}>Delete</button> </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Update Form */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Edit Job Position">
        <h2>Edit Job Position</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <input name="department" value={form.department} onChange={handleChange} placeholder="Department" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input name="requiredQualifications" value={form.requiredQualifications} onChange={handleChange} placeholder="Qualifications" required />
          <button type="submit">{editingJob ? 'Update' : 'Add'}</button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Job_Position;
