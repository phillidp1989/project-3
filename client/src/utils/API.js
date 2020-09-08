import axios from 'axios';

export default {
  // Gets all books
  getBooks: async (query) => {
    try {
      return await axios.request({
        method: "POST",
        url: "/books",
        data: query
      });      
    } catch (err) {
      console.error('ERROR - src/API.js - getBooks', err);
    }
  },
  getMyBooks: async (userId) => {
    try {
      return await axios.request({
        method: "POST",
        url: "/api/savedbooks",
        data: userId
      });      
    } catch (err) {
      console.error('ERROR - src/API.js - getBooks', err);
    }
  },  
  // Delete book using req.params.id
  deleteBook: async id => {
    try {
      console.log(id);
      return await axios.delete("/api/books/" + id._id);      
    } catch (err) {
      console.error('ERROR - API.js - deleteBook', err);
    }
  },
  // Saves a book to the database
  saveBook: async bookData => {
    try {
      return await axios.post("/api/books", bookData);      
    } catch (err) {
      console.error('ERROR - API.js - saveBook', err);
    }
  }
};