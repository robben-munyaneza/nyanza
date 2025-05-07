const express = require('express');
const router = express.Router();
const applicantController = require('../controller/ApplicantController');

// CREATE
router.post('/', applicantController.createApplicant);

// READ ALL
router.get('/', applicantController.getApplicants);

// READ ONE
router.get('/:id', applicantController.getApplicantById);

// UPDATE
router.put('/:id', applicantController.updateApplicant);

// DELETE
router.delete('/:id', applicantController.deleteApplicant);

module.exports = router;
