const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  ContactNumber: { type: String, required: true },
  ApplicationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Applicant', applicantSchema);
