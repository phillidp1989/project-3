const axios = require("axios");
const config = require('../config/config');
const key = config.api.key;

const getBooks = async (query) => {
  try {
    console.log(query.data);
    const results = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query.data}&key=${key}`
    );
    console.log(results.data);    
    const data = results.data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      link: book.volumeInfo.infoLink,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://placehold.it/300x300"
    }));
    return data;
  } catch (err) {
    console.error('ERROR - API.js - getBooks', err);
  }
};

module.exports = getBooks;