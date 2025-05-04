const JobPosition = require('../model/jobposition');

// Create
exports.createJob = async (req, res) => {
    try {
      console.log("Received data:", req.body); // Debug log
      const job = new JobPosition(req.body);
      const savedJob = await job.save();
      console.log("Saved job:", savedJob); // Confirm save
      res.status(201).json(savedJob);
    } catch (err) {
      console.error("Save error:", err); // Log error
      res.status(400).json({ error: err.message });
    }
  };

// Read all
exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobPosition.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getJobById = async (req, res) => {
  try {
    const job = await JobPosition.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateJob = async (req, res) => {
  try {
    const job = await JobPosition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteJob = async (req, res) => {
  try {
    const job = await JobPosition.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
