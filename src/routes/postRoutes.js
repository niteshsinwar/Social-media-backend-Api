const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

// Add a new post
router.post('/posts', auth, postController.createPost);

// Delete a post by ID
router.delete('/posts/:id', auth, postController.deletePost);

// Like a post by ID
router.post('/like/:id', auth, postController.likePost);

// Unlike a post by ID
router.post('/unlike/:id', auth, postController.unlikePost);

// Add a comment to a post by ID
router.post('/comment/:id', auth, postController.addComment);

// Get a post by ID with likes and comments
router.get('/posts/:id', postController.getPostById);

// Get all posts created by authenticated user
router.get('/all_posts', auth, postController.getAllPosts);

module.exports = router;
