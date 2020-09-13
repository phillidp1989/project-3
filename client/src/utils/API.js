import axios from 'axios';

export default {
  currentUser: async () => {
    try {
      return await axios.get('/api/user', {
        withCredentials: true
      });
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
  dashboardInfo: async (id) => {
    try {
      return await axios.get(`/api/posts/dashboard/${id}`);
    } catch (err) {
      console.error('ERROR - API.js - dashboardInfo', err);
    }
  },
  getUserPosts: async (id) => {
    try {
      return await axios.get(`/api/posts/user/${id}`);

    } catch (err) {
      console.error('ERROR - API.js - getUserPosts', err);
    }
  },

  getPostSolutions: async (postId) => {
    try {
      console.log(postId);
      return await axios.get(
        `/api/solutions/post/${postId}`

      );
    } catch (err) {
      console.error('ERROR - API.js - getPostSolutions', err);
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
      return await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
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
  getSolution: async (id) => {
    try {
      return await axios.get(`/api/solutions/${id}`);
    } catch (err) {
      console.error('ERROR - API.js - getSolution', err);
    }
  },
  updateSolution: async (solutionData) => {
    try {
      console.log(solutionData);
      return await axios.put(`/api/solutions`, solutionData);
    } catch (err) {
      console.error('ERROR - API.js - updateSolution', err);
    }
  },
  deleteSolution: async (id) => {
    try {
      return await axios.delete(`/api/solutions/${id}`);
    } catch (err) {
      console.error('ERROR - API.js - deleteSolution', err);
    }
  },
  likeDevPost: async (solutionId, userId) => {
    try {
      return await axios.put('/api/solutions/like', {
        solutionId,
        userId
      });
    } catch (err) {
      console.error('ERROR - API.js - likeDevPost', err);
    }
  },
  unlikeDevPost: async (solutionId, userId) => {
    try {
      return await axios.put('/api/solutions/unlike', {
        solutionId,
        userId
      });
    } catch (err) {
      console.error('ERROR - API.js - unlikeDevPost', err);
    }
  },
  getUserSolutions: async (id) => {
    try {
      return await axios.get(
        `/api/solutions/developer/${id}`
      );
    } catch (err) {
      console.error('ERROR - API.js - getUserSolutions', err);
    }
  },
  getDeveloperAvatars: async (id) => {
    try {
      return await axios.get(`/api/posts/activedeveloperavatars/${id}`)
    } catch (err) {
      console.error('ERROR - API.js - getDeveloperAvatars', err);
    }
  },
  getUser: async (posterId) => {
    try {
      return await axios.get(`/api/user/${posterId}`)
    } catch (err) {
      console.error('ERROR - API.js - getDeveloperAvatars', err);
    }
  }
};
