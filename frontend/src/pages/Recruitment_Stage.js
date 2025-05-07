import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function Recruitment_Stage() {
  const [recruitmentStages, setRecruitmentStages] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    ApplicantId: '',
    StageName: '',
    StageStatus: '',
    CompletionDate: '',
  });
  const [editingStage, setEditingStage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchRecruitmentStages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/recruitmentstages');
      setRecruitmentStages(res.data);
    } catch (err) {
      console.error('Fetch recruitment stages error:', err.message);
      alert('Failed to load recruitment stages.');
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/Applicant');
      setApplications(res.data);
    } catch (err) {
      console.error('Fetch applications error:', err.message);
      alert('Failed to load applications.');
    }
  };

  useEffect(() => {
    fetchRecruitmentStages();
    fetchApplicants();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStage) {
        await axios.put(`http://localhost:5000/api/recruitmentstages/${editingStage._id}`, form);
        setEditingStage(null);
      } else {
        await axios.post('http://localhost:5000/api/recruitmentstages', form);
      }
      setForm({
        ApplicantId: '',
        StageName: '',
        StageStatus: '',
        CompletionDate: '',
      });
      fetchRecruitmentStages();
      setModalIsOpen(false);
    } catch (err) {
      console.error('Submit error:', err.message);
      alert('Error submitting form');
    }
  };

  const handleEdit = (stage) => {
    setForm({
      ApplicantId: stage.ApplicantId,
      StageName: stage.StageName,
      StageStatus: stage.StageStatus,
      CompletionDate: stage.CompletionDate.split('T')[0], // Format date
    });
    setEditingStage(stage);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stage?')) {
      try {
        await axios.delete(`http://localhost:5000/api/recruitmentstages/${id}`);
        fetchRecruitmentStages();
      } catch (err) {
        console.error('Delete error:', err.message);
        alert('Failed to delete');
      }
    }
  };

  const renderApplicantName = (id) => {
    const applicant = applications.find((app) => app._id === id);
    return applicant ? `${applicant.FirstName} ${applicant.LastName}` : 'Unknown';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recruitment Stages</h2>

      {/* Recruitment Stage Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select name="ApplicantId" value={form.ApplicantId} onChange={handleChange} required>
          <option value="">Select Applicant</option>
          {applications.map((applicant) => (
            <option key={applicant._id} value={applicant._id}>
              {applicant.FirstName} {applicant.LastName}
            </option>
          ))}
        </select>

        <input
          name="StageName"
          value={form.StageName}
          onChange={handleChange}
          placeholder="Stage Name"
          required
        />

        <select name="StageStatus" value={form.StageStatus} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>

        <input
          name="CompletionDate"
          type="date"
          value={form.CompletionDate}
          onChange={handleChange}
          required
        />

        <button type="submit">{editingStage ? 'Update' : 'Add'}</button>
      </form>

      {/* Recruitment Stages Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Stage Name</th>
            <th>Stage Status</th>
            <th>Completion Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruitmentStages.map((stage) => (
            <tr key={stage._id}>
              <td>{renderApplicantName(stage.ApplicantId)}</td>
              <td>{stage.StageName}</td>
              <td>{stage.StageStatus}</td>
              <td>{stage.CompletionDate.split('T')[0]}</td>
              <td>{stage.CompletionDate.split('T')[0]}</td>
              <td>
                <button onClick={() => handleEdit(stage)}>Edit</button>
                <button
                  onClick={() => handleDelete(stage._id)}
                  style={{ marginLeft: '5px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Edit Form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Recruitment Stage"
      >
        <h2>{editingStage ? 'Edit Recruitment Stage' : 'Add Recruitment Stage'}</h2>
        <form onSubmit={handleSubmit}>
          <select name="ApplicantId" value={form.ApplicantId} onChange={handleChange} required>
            <option value="">Select Applicant</option>
            {applications.map((applicant) => (
              <option key={applicant._id} value={applicant._id}>
                {applicant.FirstName} {applicant.LastName}
              </option>
            ))}
          </select>

          <input
            name="StageName"
            value={form.StageName}
            onChange={handleChange}
            placeholder="Stage Name"
            required
          />

          <select name="StageStatus" value={form.StageStatus} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>

          <input
            name="CompletionDate"
            type="date"
            value={form.CompletionDate}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingStage ? 'Update' : 'Add'}</button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Recruitment_Stage;
