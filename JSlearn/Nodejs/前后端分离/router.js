let express = require('express');
let router = express.Router();
let api = require('./api');

router.get('/books',api.allBook);
router.post('/books/book',api.addBook);
router.get('/books/book/:id',api.getBookById);
router.put('/books/book',api.editBook);
router.delete('/books/book/:id',api.removeBook);

module.exports = router;