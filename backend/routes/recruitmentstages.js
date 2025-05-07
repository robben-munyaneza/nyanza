const express = require('express');
const router = express.Router();
const recruitmentStageController = require('../controller/Recruitment_StageController');

// CREATE: Create a new recruitment stage
router.post('/', recruitmentStageController.createRecruitmentStage);

// READ ALL: Get all recruitment stages
router.get('/', recruitmentStageController.getAllRecruitmentStages);

// READ ONE: Get a recruitment stage by ID
router.get('/:id', recruitmentStageController.getRecruitmentStageById);

// UPDATE: Update a recruitment stage by ID
router.put('/:id', recruitmentStageController.updateRecruitmentStageById);

// DELETE: Delete a recruitment stage by ID
router.delete('/:id', recruitmentStageController.deleteRecruitmentStageById);

module.exports = router;
