// models/RecruitmentStage.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the RecruitmentStage Schema

const recruitmentStageSchema = new Schema({

  ApplicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
  StageName: { type: String, required: true },
  StageStatus: { type: String, required: true },
  CompletionDate: { type: Date, default: null }
});
// Create and export the model
const RecruitmentStage = mongoose.model('RecruitmentStage', recruitmentStageSchema);
module.exports = RecruitmentStage;
