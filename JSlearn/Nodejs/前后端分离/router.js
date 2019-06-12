let express = require('express');
let router = express.Router();
let handel = require('./handel');

router.get('/books',handel.allBook);
router.post('/books/book',handel.addBook);
router.get('/books/book/:id',handel.getBookById);
router.put('/books/book',handel.editBook);
router.delete('/books/book/:id',handel.removeBook);

module.exports = router;