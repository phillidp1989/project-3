const db = require('../models');

module.exports = {
  // Get all posts for homepage
  allPosts: async (req, res, next) => {
    try {
      const results = await db.Post.find({}).sort({ date: -1 });
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  },
  // Get a single post based on post ID
  getPost: async (req, res, next) => {
    try {
      const result = await db.Post.findById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Get all posts by a specific user
  getUserPosts: async (req, res, next) => {
    try {
      const results = await db.Post.find({ posterId: req.params.id }).sort({
        date: -1
      });
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  },
  // Save a new post
  savePost: async (req, res, next) => {
    const {
      title,
      summary,
      description,
      categories,
      technologies,
      posterId
    } = req.body;
    try {
      const result = await db.Post.create({
        title,
        summary,
        description,
        categories,
        technologies,
        posterId,
        score: 0,
        activeDevelopers: [],
        solutions: [],
        likedBy: []
      });
      const ref = await db.User.updateOne(
        { _id: posterId },
        { $push: { posts: result._id } }
      );
      res.status(200).json(result, ref);
    } catch (err) {
      next(err);
    }
  },
  // Delete a post
  deletePost: async (req, res, next) => {
    const { id: postId } = req.params;
    try {
      // Find the solutions and users associated with deleted post
      const postQuery = await db.Post.findOne({ _id: postId }).populate([
        'solutions',
        'posterId'
      ]);
      // Create an array of solution IDs attached to post
      const solutions = postQuery.solutions.map((solution) => solution._id);
      // Remove all associated solutions
      const results = await db.Solution.remove({ _id: { $in: solutions } });
      // Remove post
      const result = await db.Post.remove({ _id: postId });
      res.status(200).json(result, results);
    } catch (err) {
      next(err);
    }
  },
  // Update post details
  updatePost: async (req, res, next) => {
    const {
      _id,
      title,
      summary,
      description,
      category,
      technologies
    } = req.body;
    try {
      const result = await db.Post.updateOne(
        { _id },
        { $set: { title, summary, description, category, technologies } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Like post
  likePost: async (req, res, next) => {
    const { postId, userId } = req.body;
    try {
      const result = await db.Post.updateOne(
        { _id: postId },
        { $push: { likedBy: userId }, $inc: { score: 1 } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Like post
  unlikePost: async (req, res, next) => {
    const { postId, userId } = req.body;
    try {
      const result = await db.Post.updateOne(
        { _id: postId },
        { $pull: { likedBy: userId }, $inc: { score: -1 } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Dashboard data
  dashboardInfo: async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await db.User.findById(id).populate([
        'posts',
        'solutions'
      ]);

      const totalPosts = result.posts.length;
      const totalSolutions = result.solutions.length;
      const postLikes = result.posts.map(post => post.score).reduce((a, b) => a + b, 0);
      const solutionLikes = result.solutions.map(post => post.score).reduce((a, b) => a + b, 0);
      const postsWithSolution = result.posts.filter(post => post.solutions.length > 0).length;
      const postsWithoutSolution = totalPosts - postsWithSolution;
      const completedSolutions = result.solutions.filter(solution => solution.deployedLink).length;
      const inProgressSolutions = totalSolutions - completedSolutions;
      const category2dArray = result.posts.map(post => post.category);
      const categoryArray = [].concat.apply([], category2dArray);
      const categoryData = [];
      const categoryCount = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
      categoryData.push(categoryCount(categoryArray, 'Business'));
      categoryData.push(categoryCount(categoryArray, 'Design'));
      categoryData.push(categoryCount(categoryArray, 'Gaming'));
      categoryData.push(categoryCount(categoryArray, 'Journalism'));
      categoryData.push(categoryCount(categoryArray, 'Marketing'));
      const categoryList = ['Business', 'Design', 'Gaming', 'Journalism', 'Marketing'];

      res.status(200).json({
        totalPosts,
        totalSolutions,
        postLikes,
        solutionLikes,
        postsWithSolution,
        postsWithoutSolution,
        completedSolutions,
        inProgressSolutions,
        categoryData,
        categoryList
      });
    } catch (err) {
      next(err);
    }
  }
};
