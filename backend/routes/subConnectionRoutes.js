const express = require('express');
const router = express.Router();
const subConnectionController = require('../controllers/subConnectionController');

router.get('/', subConnectionController.getAllSubConnections);
router.post('/', subConnectionController.createSubConnection);
router.put('/:id', subConnectionController.updateSubConnection);
router.delete('/:id', subConnectionController.deleteSubConnection);

module.exports = router;
