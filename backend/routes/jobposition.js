const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobpositionController');

// CREATE
router.post('/', jobController.createJob);

// READ ALL
router.get('/', jobController.getJobs);

// READ ONE
router.get('/:id', jobController.getJobById);

// UPDATE
router.put('/:id', jobController.updateJob);

// DELETE
router.delete('/:id', jobController.deleteJob);

module.exports = router;
