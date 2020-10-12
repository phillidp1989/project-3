const db = require('../models');

module.exports = {
  // Get solution by ID
  getSolution: async (req, res, next) => {
    try {
      const result = await db.Solution.findById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Get all solutions
  allPostSolutions: async (req, res, next) => {
    try {
      const result = await db.Post.findOne({ _id: req.params.id }).populate(
        'solutions'
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  allDeveloperSolutions: async (req, res, next) => {
    try {
      const results = await db.Solution.find({
        developerId: req.params.id
      }).sort({
        date: -1
      });
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  },
  allPosterSolutions: async (req, res, next) => {
    try {
      const results = await db.Solution.find({ posterId: req.params.id }).sort({
        date: -1
      });
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  },
  saveSolution: async (req, res, next) => {
    try {
      const {
        comments,
        repoName,
        repoDescription,
        repoLink,
        deployedLink,
        postId,
        posterId,
        developerId
      } = req.body;
      const result = await db.Solution.create({
        comments,
        repoName,
        repoDescription,
        repoLink,
        deployedLink,
        postId,
        posterId,
        developerId,
        score: 0,
        likedBy: []
      });
      const postRef = await db.Post.updateOne(
        { _id: postId },
        { $push: { activeDevelopers: developerId, solutions: result._id } }
      );
      const userRef = await db.User.updateOne(
        { _id: developerId },
        { $push: { solutions: result._id } }
      );
      res.status(200).json(result, postRef, userRef);
    } catch (err) {
      next(err);
    }
  },
  // Delete a solution
  deleteSolution: async (req, res, next) => {
    const { id } = req.params;
    try {
      const query = await db.Solution.findOne({ _id: id }).populate([
        'postId',
        'developerId'
      ]);
      const postRef = await db.Post.updateOne(
        { _id: query.postId._id },
        { $pull: { solutions: id, activeDevelopers: query.developerId._id } }
      );
      const userRef = await db.User.updateOne(
        { _id: query.developerId._id },
        { $pull: { solutions: id } }
      );
      const result = await db.Solution.remove({ _id: id });
      res.status(200).json(result, postRef, userRef);
    } catch (err) {
      next(err);
    }
  },
  // Update post details
  addComment: async (req, res, next) => {
    const { solutionId, comments } = req.body;
    try {
      const result = await db.Solution.updateOne(
        { _id: solutionId },
        { $push: { comments } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Delete single comment
  removeComment: async (req, res, next) => {
    const { solutionId, comment } = req.body;
    try {
      const result = await db.Solution.updateOne(
        { _id: solutionId },
        { $pull: { comment } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Like solution
  likeSolution: async (req, res, next) => {
    const { solutionId, userId } = req.body;
    try {
      const result = await db.Solution.updateOne(
        { _id: solutionId },
        { $push: { likedBy: userId }, $inc: { score: 1 } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Like solution
  unlikeSolution: async (req, res, next) => {
    const { solutionId, userId } = req.body;
    try {
      const result = await db.Solution.updateOne(
        { _id: solutionId },
        { $pull: { likedBy: userId }, $inc: { score: -1 } }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Update post details
  updateSolution: async (req, res, next) => {
    const {
      _id,
      comments,
      repoName,
      repoDescription,
      repoLink,
      deployedLink
    } = req.body;
    try {
      const result = await db.Solution.updateOne(
        { _id },
        {
          $set: {
            comments,
            repoName,
            repoDescription,
            repoLink,
            deployedLink
          }
        }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};
