import React, { useEffect, useState } from 'react';

function Applicant() {
  const [applicants, setApplicants] = useState([]);
  const [form, setForm] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    ContactNumber: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all applicants
  const fetchApplicants = async () => {
    const res = await fetch('http://localhost:5000/api/Applicant');
    const data = await res.json();
    setApplicants(data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update applicant
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/api/Applicant/${editingId}`
      : `http://localhost:5000/api/Applicant`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setForm({
      FirstName: '',
      LastName: '',
      Email: '',
      ContactNumber: ''
    });
    setEditingId(null);
    fetchApplicants();
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/Applicant/${id}`, {
      method: 'DELETE',
    });
    fetchApplicants();
  };

  // Edit
  const handleEdit = (applicant) => {
    setForm({
      FirstName: applicant.FirstName,
      LastName: applicant.LastName,
      Email: applicant.Email,
      ContactNumber: applicant.ContactNumber,
    });
    setEditingId(applicant._id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Applicant Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={form.FirstName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={form.LastName}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="ContactNumber"
          placeholder="Contact Number"
          value={form.ContactNumber}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">{editingId ? 'Update' : 'Add'} Applicant</button>
      </form>

      <h3>Applicants List</h3>
      <ul>
        {applicants.map((applicant) => (
          <li key={applicant._id}>
            {applicant.FirstName} {applicant.LastName} - {applicant.Email} - {applicant.ContactNumber}
            <button onClick={() => handleEdit(applicant)}>Edit</button>
            <button onClick={() => handleDelete(applicant._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Applicant;
