const db = require('../models');

module.exports = {
  // Get specific user data
  getUser: async (req, res, next) => {
    try {
      const result = await db.User.findById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Update user details
  updateUser: async (req, res, next) => {
    const {
      _id,
      provider,
      providerId,
      username,
      displayName,
      avatar,
      isDeveloper
    } = req.body;
    try {
      const result = await db.User.updateOne(
        { _id },
        {
          $set: {
            provider,
            providerId,
            username,
            displayName,
            avatar,
            isDeveloper
          }
        }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
  // Get current user data
  getCurrentUser: (req, res) => {
    res.send({ user: req.user });
  }
};
