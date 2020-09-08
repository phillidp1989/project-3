const router = require("express").Router();
const booksController = require("../controllers/bookController");

router.post("/savedbooks", booksController.findAll);
router.post("/books", booksController.saveBook);
router.delete("/books/:id", booksController.deleteBook);

module.exports = router;
