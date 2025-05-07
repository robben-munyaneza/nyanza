const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  ApplicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true }, 
  JobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosition', required: true }, 
  ApplicationStatus: { type: String, default: 'Pending' },
  ReviewDate: { type: Date }
});

// Create and export the Application model
module.exports = mongoose.model('Application', applicationSchema);
