const router = require('express').Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const solutionController = require('../controllers/solutionController');

// Posts

// Get all posts
router.get('/posts', postController.allPosts);
// Get post by post ID
router.get('/posts/:id', postController.getPost);
// Get posts by user ID
router.get('/posts/user/:id', postController.getUserPosts);
// Post new idea
router.post('/posts', postController.savePost);
// Delete post
router.delete('/posts/:id', postController.deletePost);
// Edit post details
router.put('/posts', postController.updatePost);
// Like post
router.put('/posts/like', postController.likePost);
// Unlike post
router.put('/posts/unlike', postController.unlikePost);
// Get dashboard data
router.get('/posts/dashboard/:id', postController.dashboardInfo);
// Get avatars of active developers
router.get(
  '/posts/activedeveloperavatars/:id',
  postController.activeDeveloperAvatars
);

// Solutions

// // Get a solution by solution ID
router.get('/solutions/:id', solutionController.getSolution);
// // Get all solutions by post ID
router.get('/solutions/post/:id', solutionController.allPostSolutions);
// // Get all solutions by developer ID
router.get(
  '/solutions/developer/:id',
  solutionController.allDeveloperSolutions
);
// // Get all solutions by poster ID
router.get('/solutions/poster/:id', solutionController.allPosterSolutions);
// // Post new solution
router.post('/solutions', solutionController.saveSolution);
// // Delete solution
router.delete('/solutions/:id', solutionController.deleteSolution);
// // Add comment
router.put('/solutions/newcomment', solutionController.addComment);
// // Remove comment
router.put('/solutions/removecomment', solutionController.removeComment);
// Like solution
router.put('/solutions/like', solutionController.likeSolution);
// Unlike post
router.put('/solutions/unlike', solutionController.unlikeSolution);
// Update solution
router.put('/solutions', solutionController.updateSolution);

// Users

// Route to send current user object to client
router.get('/user', userController.getCurrentUser);
// Get user by ID
router.get('/user/:id', userController.getUser);
// Editing user details
router.put('/user', userController.updateUser);

module.exports = router;
