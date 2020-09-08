const mongoose = require('mongoose');

// Creation of User schema
const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,                 
    },    
    displayName: {
      type: String,
    },    
    avatar: {
      type: String,
    }    
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;