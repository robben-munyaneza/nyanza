const express = require('express');
const router = express.Router();
const appController = require('../controller/ApplicationController');

// CREATE
router.post('/', appController.createApplication);

// READ ALL
router.get('/', appController.getApplications);

// READ ONE
router.get('/:id', appController.getApplicationById);

// UPDATE
router.put('/:id', appController.updateApplication);

// DELETE
router.delete('/:id', appController.deleteApplication);

module.exports = router;
