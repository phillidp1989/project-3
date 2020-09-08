const Book = require('../models/Book');

module.exports = {
  findAll: async (req, res) => {
    try {
      console.log(req.body);
      const results = await Book.find({ userId: req.body.providerId }).sort({ date: -1 });
      res.json(results);  
    } catch (err) {      
      console.log("ERROR - bookController.js - findAll", err);
      res.status(401);
    }    
  },
  saveBook: async (req, res) => {
    try {
      console.log(req.body);
      const result = await Book.create(req.body);
      res.json(result); 
    } catch (err) {
      console.log("ERROR - bookController.js - saveBook", err);
      res.status(401);
    }    
  },
  deleteBook: async (req, res) => {
    try {
      console.log(req.params);
      const result = await Book.remove({_id: req.params.id});
      res.status(200).json(result);
    } catch (err) {
      console.log("ERROR - bookController.js - deleteBook", err);
      res.status(401);
    }    
  }
}