const express = require('express');
const router = express.Router();
const handler = require('./handlers');
const config = require('./config')

router.get('/',handler.showIndex);

router.get('/toAdd',handler.toAdd);

router.post('/addBook',handler.addBook);

router.get('/toEditBook',handler.toEdit);

router.post('/editBook',handler.editBook);

router.get('/removeBook',handler.removeBook);
//静态资源处理
router.use('/public',express.static(config.publicPath));

module.exports = router;