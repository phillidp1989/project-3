const mongoose = require('mongoose');

// Creation of Solution schema

const SolutionSchema = mongoose.Schema(
  {
    comments: [{ type: String }],
    repoName: { type: String },
    repoDescription: { type: String },
    repoLink: { type: String },
    deployedLink: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Solution = mongoose.model('Solution', SolutionSchema);

module.exports = Solution;
