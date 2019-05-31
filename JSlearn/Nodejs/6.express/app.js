//引入express 模块
var express = require('express');

// 实例化express的对象
var app = express();
//让服务器识别外部样式表
app.use('/pubilc', express.static('./public'));//静态文件转为模块
// 配置视图引擎
app.set('view engine', 'ejs');



//跟用户请求的地址，返回对应的信息
app.get('/', function (req, res) {
  res.send('this is home page');//向页面发送
  // res.send(__dirname + '/home.html');//这种方式是不可以实现的 send 发送的是纯文本
  // res.sendfile(__dirname + "/home.html");
  // res.render('index');
})

//使用res.sendFile
app.get('/sendFile',(req,res)=>{
  res.sendFile(__dirname+'/index.html',(err)=>{
      if(err){
          throw err;
      }
  })
})

//通过正则表达式 注册路由
app.get(/^\/index(\/.+)*$/, (req, res) => {
  res.send('success');
})

//路由参数  
//路径http://localhost:3000/profile/newfor2019
app.get('/profile/:id', function (req, res) {
  // res.sendfile(__dirname + '/view/profile.ejs');//无法展示页面  浏览器不识别 ejs
  // res.render('profile',{name:'EJS'});
  res.send(req.params.id);
})

//传送json数据
app.get('/json', (req, res) => {
  //与res.end 或者send 一个对象完全相同   end只能是对象
  res.json([{ 'name': 'Henry', age: 20 }]);
})

//使用res.status 返回错误信息
app.get('/err',(req,res)=>{
  res.statusMessage = 'Not Found';
  res.status(404).send('文件不存在');
})
//监听服务器端口号

//重定向
app.get('/baidu',(req,res)=>{
  res.redirect(301,'http://www.baidu.com');
});

app.listen(3000, () => {
  console.log('server is running path:http://localhost:3000');
});