let express = require('express');
//创建一个router 对象（router 即是一个对象也是一个函数）
let router = express.Router();
let config = require('./config');
let handler = require('./handler');

//通过router 对象设置（挂载） 路由
router.get('/', handler.index);

router.get('/index', handler.index);

router.get('/submit', handler.submit);

router.get('/item', handler.item);

router.get('/add', handler.get);

router.post('/add', handler.post);

//静态资源处理
router.use('/public',express.static(config.publicPath));

//返回router 对象
module.exports = router;

