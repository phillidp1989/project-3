import axios from 'axios';

export default {
  allPosts: async () => {
    try {
      return await axios.get('/api/posts')
    } catch (err) {
      console.error('ERROR - API.js - allPosts', err);
    }
  },
  likePost: async (postId, userId) => {
    try {
      return await axios.put('/api/posts/like', {
        postId,
        userId
      })
    } catch (err) {
      console.error('ERROR - API.js - likePost', err);
    }
  }
}