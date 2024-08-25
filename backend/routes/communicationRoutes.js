const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

// Route to get all communication data
router.get('/', communicationController.getAllCommunications);

// Route to create new communication data
router.post('/', communicationController.createCommunication);

// Route to update existing communication data
router.put('/:id', communicationController.updateCommunication);

// Route to delete communication data
router.delete('/:id', communicationController.deleteCommunication);

module.exports = router;
