const mongoose = require('mongoose');

// Creation of Post schema

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true,
      max: 200
    },
    description: {
      type: String,
      required: true
    },
    category: [
      {
        type: String,
        required: true
      }
    ],
    technologies: [{ type: String }],
    score: {
      type: Number,
      default: 0
    },
    comments: { type: String },
    posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    activeDevelopers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
