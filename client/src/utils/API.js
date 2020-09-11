import axios from 'axios';

export default {
  currentUser: async () => {
    try {
      return await axios.get('/api/user', { withCredentials: true })
    } catch (err) {
      console.error('ERROR - API.js - currentUser', err);
    }
  },
  allPosts: async () => {
    try {
      return await axios.get('/api/posts');
    } catch (err) {
      console.error('ERROR - API.js - allPosts', err);
    }
  },
  likePost: async (postId, userId) => {
    try {
      return await axios.put('/api/posts/like', {
        postId,
        userId
      });
    } catch (err) {
      console.error('ERROR - API.js - likePost', err);
    }
  },
  unlikePost: async (postId, userId) => {
    try {
      return await axios.put('/api/posts/unlike', {
        postId,
        userId
      });
    } catch (err) {
      console.error('ERROR - API.js - unlikePost', err);
    }
  },
  dashboardInfo: async id => {
    try {
      return await axios.get(`/api/posts/dashboard/${id}`)
    } catch (err) {
      console.error('ERROR - API.js - dashboardInfo', err);
    }
  },
  getUserPosts: async (id) => {
    try {
      return await axios.get(`/api/posts/user/${id}`);
    } catch (err) {
      console.error('ERROR - UserPosts() - getUserPosts', err);
    }
  },
  savePost: async (postData) => {
    try {
      return await axios.post(`/api/posts`, postData);
    } catch (err) {
      console.error('ERROR - API.js - savePost', err);
    }
  },
  github: async (username) => {
    try {
      return await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
    } catch (err) {
      console.error('ERROR - API.js - github', err);
    }
  },
  saveSolution: async (solutionData) => {
    try {
      return await axios.post('/api/solutions', solutionData);
    } catch (err) {
      console.error('ERROR - API.js - saveSolution', err);
    }
  },
  getPost: async (id) => {
    try {
      return await axios.get(`/api/posts/${id}`);
    } catch (err) {
      console.error('ERROR - API.js - getPost', err);
    }
  },
};


