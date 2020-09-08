const router = require("express").Router();
const getBooks = require('../utils/API');
const { authCheck } = require("../middleware/auth");

router.post('/books', async (req, res) => {
  try {
    const results = await getBooks(req.body)
    res.status(200).json(results)
  } catch (err) {
    console.error('ERROR - apiRoutes.js - get/books', err);
  }  
});

module.exports = router;