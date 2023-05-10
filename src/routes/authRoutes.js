const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User authentication endpoint
router.post('/authenticate', authController.authenticate);

module.exports = router;
