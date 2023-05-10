const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Route to get user profile
router.get('/user', authMiddleware, userController.getUserProfile);

// Route to follow a user
router.post('/follow/:id', authMiddleware, userController.followUser);

// Route to unfollow a user
router.post('/unfollow/:id', authMiddleware, userController.unfollowUser);

module.exports = router;
