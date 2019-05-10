//入口文件

//引入express框架
var express = require('express');

//引入自定义模块
var todoController = require('./controller/todoController');

//实例化
var app = express();

//设置视图引擎
app.set('view engine','ejs');

//静态样式文件 将在此文件夹转化成服务器可识别的模块
app.use('./public',express.static('public'));

//将app对象return到todoController
todoController(app);

//监听
app.listen(3000);