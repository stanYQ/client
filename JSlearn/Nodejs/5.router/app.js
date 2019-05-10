//引入http模块
var http = require('http');
var fs = require('fs');

//创建服务器方法
var server = http.createServer((req,res)=>{
  if(req.url === '/home' || req.url ==='/'){
    res.writeHead(200,{"Content-type":"text/html"});// html数 在 response 结束返回  
    fs.createReadStream(__dirname+'/home.html','utf-8').pipe(res);
  }else if(req.url ==='/contact'){
    res.writeHead(200,{"Content-type":"text/html"});// html数 在 response 结束返回  
    fs.createReadStream(__dirname+'/contact.html','utf-8').pipe(res);
  }else if(req.url ==='/api/docs'){
      res.writeHead(200,{"Content-type":'text/html'});
      fs.createReadStream(__dirname+'/api/docs.html','utf-8').pipe(res);
    //   var data = [{name:"Henry",age:"30"}];
    //   res.writeHead(200,{"Content-type":"application/json"});
    //   res.end(JSON.stringify(data));// 将数据展示到HTML页面
  }
})

//服务对象监听服务器地址以及端口号

server.listen(3000,"127.0.0.1");

console.log("server is running");