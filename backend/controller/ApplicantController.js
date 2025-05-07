const Applicant = require('../model/Applicants');

// Create
exports.createApplicant = async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    const savedApplicant = await applicant.save();
    res.status(201).json(savedApplicant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getApplicantById = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });
    res.status(200).json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });
    res.status(200).json(applicant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });
    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
