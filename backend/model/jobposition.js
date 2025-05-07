const mongoose = require('mongoose');

const jobPositionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  description: { type: String, required: true },
  requiredQualifications: { type: String, required: true }
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.JobPosition || mongoose.model('JobPosition', jobPositionSchema);
