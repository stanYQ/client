//引入express 模块
var express = require('express');

// 实例化express的对象
var app = express();
//让服务器识别外部样式表
app.use('/style',express.static('style'));//静态文件转为模块
// 配置视图引擎
app.set('view engine','ejs');

//通过对象调用对应的方法


//跟用户请求的地址，返回对应的一个信息
app.get('/', function (req, res) {
  // res.send('this is home page');//向页面发送
  // res.send(__dirname + '/home.html');//这种方式是不可以实现的 send 发送的是纯文本
  //  res.sendfile(__dirname + "/home.html");
  res.render('index');
})

app.get('/contact', function (req, res) {
  // res.send('this is contact page');
  res.render('contact');
})

//路由参数  
//路径http://localhost:3000/profile/newfor2019
app.get('/profile/:id', function (req, res) {
  // res.sendfile(__dirname + '/view/profile.ejs');//无法展示页面  浏览器不识别 ejs
  res.render('profile',{name:'EJS'});
})

//监听服务器端口号

app.listen(3000);