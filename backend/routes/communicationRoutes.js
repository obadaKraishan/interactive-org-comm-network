const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');

router.get('/', communicationController.getAllCommunications);
router.post('/', communicationController.createCommunication);
router.put('/:id', communicationController.updateCommunication);
router.delete('/:id', communicationController.deleteCommunication);

module.exports = router;
