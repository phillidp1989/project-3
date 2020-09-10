const mongoose = require('mongoose');
const { db } = require('./config');

// Function to connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(db.uri || 'mongodb://localhost/book-search', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Connected to DB');
    return true;
  } catch (err) {
    console.error('ERROR - db.js - connectDB: ', err);
    process.exit(1);
  }
};

module.exports = connectDB;
