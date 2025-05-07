const mongoose = require('mongoose');
const RecruitmentStage = require('../model/Recruitment_Stages');
const Applicant = require('../model/Applicants');

// CREATE
exports.createRecruitmentStage = async (req, res) => {
  try {
    const {  ApplicantId, StageName, StageStatus, CompletionDate } = req.body;

    // Optional: Check if applicant exists
    const applicantExists = await Applicant.findById(ApplicantId);
    if (!applicantExists) {
      return res.status(400).json({ message: 'Invalid ApplicantId: Applicant not found' });
    }

    const newStage = new RecruitmentStage({
  
      ApplicantId,
      StageName,
      StageStatus,
      CompletionDate
    });

    await newStage.save();
    res.status(201).json(newStage);
  } catch (error) {
    console.error('Error creating recruitment stage:', error);
    res.status(500).json({ message: 'Error creating recruitment stage', error: error.message });
  }
};

// READ ALL
exports.getAllRecruitmentStages = async (req, res) => {
  try {
    const stages = await RecruitmentStage.find();
    res.status(200).json(stages);
  } catch (error) {
    console.error('Error fetching recruitment stages:', error);
    res.status(500).json({ message: 'Error fetching recruitment stages', error: error.message });
  }
};

// READ ONE
exports.getRecruitmentStageById = async (req, res) => {
  try {
    const stage = await RecruitmentStage.findById(req.params.id);
    if (!stage) {
      return res.status(404).json({ message: 'Recruitment stage not found' });
    }
    res.status(200).json(stage);
  } catch (error) {
    console.error('Error fetching recruitment stage:', error);
    res.status(500).json({ message: 'Error fetching recruitment stage', error: error.message });
  }
};

// UPDATE
exports.updateRecruitmentStageById = async (req, res) => {
  try {
    const updatedStage = await RecruitmentStage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStage) {
      return res.status(404).json({ message: 'Recruitment stage not found' });
    }
    res.status(200).json(updatedStage);
  } catch (error) {
    console.error('Error updating recruitment stage:', error);
    res.status(500).json({ message: 'Error updating recruitment stage', error: error.message });
  }
};

// DELETE
exports.deleteRecruitmentStageById = async (req, res) => {
  try {
    const deletedStage = await RecruitmentStage.findByIdAndDelete(req.params.id);
    if (!deletedStage) {
      return res.status(404).json({ message: 'Recruitment stage not found' });
    }
    res.status(200).json({ message: 'Recruitment stage deleted successfully' });
  } catch (error) {
    console.error('Error deleting recruitment stage:', error);
    res.status(500).json({ message: 'Error deleting recruitment stage', error: error.message });
  }
};
