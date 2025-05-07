const mongoose = require('mongoose');
const Application = require('../model/Application');
const Applicant = require('../model/Applicants');
const JobPosition = require('../model/JobPosition');

// Helper function to populate ApplicantId and JobId fields
const populateApplication = async (applicationQuery) => {
  return applicationQuery
    .populate('ApplicantId', 'FirstName LastName Email')
    .populate('JobId', 'title description');
};

// Create
exports.createApplication = async (req, res) => {
  try {
    const { ApplicantId, JobId, ApplicationStatus, ReviewDate } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(ApplicantId) || !mongoose.Types.ObjectId.isValid(JobId)) {
      return res.status(400).json({ error: 'Invalid ApplicantId or JobId' });
    }

    // Check if applicant and job exist
    const applicant = await Applicant.findById(ApplicantId);
    const job = await JobPosition.findById(JobId);
    if (!applicant || !job) {
      return res.status(404).json({ error: 'Applicant or JobPosition not found' });
    }

    const newApp = new Application({
      ApplicantId,
      JobId,
      ApplicationStatus: ApplicationStatus || 'Pending',
      ReviewDate
    });

    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getApplications = async (req, res) => {
  try {
    const applications = await populateApplication(Application.find());
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getApplicationById = async (req, res) => {
  try {
    const application = await populateApplication(Application.findById(req.params.id));

    if (!application) return res.status(404).json({ message: 'Application not found' });

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateApplication = async (req, res) => {
  try {
    const { ApplicantId, JobId, ApplicationStatus, ReviewDate } = req.body;

    if (ApplicantId && !mongoose.Types.ObjectId.isValid(ApplicantId)) {
      return res.status(400).json({ error: 'Invalid ApplicantId' });
    }
    if (JobId && !mongoose.Types.ObjectId.isValid(JobId)) {
      return res.status(400).json({ error: 'Invalid JobId' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { ApplicantId, JobId, ApplicationStatus, ReviewDate },
      { new: true }
    );

    if (!application) return res.status(404).json({ message: 'Application not found' });

    const populatedApplication = await populateApplication(Application.findById(application._id));
    res.status(200).json(populatedApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
