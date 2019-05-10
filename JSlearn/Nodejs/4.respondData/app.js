//引入http模块
var http = require('http');
var fs = require('fs');

//创建服务器方法
var server = http.createServer((req,res)=>{
    console.log("客户端向服务器发送请求" + req.url);
    //{"Content-type":"text/plain"}//纯文本数据
    //{"Content-type":"text/html"}//html 页面
    //{"Content-type":"application/json"}//json 数据
    res.writeHead(200,{"Content-type":"application/json"});// html数 在 response 结束返回  
    //向请求发送响应头。 状态码是一个 3 位的 HTTP 状态码 最后一个参数 headers 是响应头
    var myReadStream = fs.createReadStream(__dirname+'/data.json','utf-8');//读取json文件中的内容
    myReadStream.pipe(res);//将读取到的数据 pipe到res中
    //根据响应头的不同格式 可以返回不同文件  
})

//服务对象监听服务器地址以及端口号

server.listen(3000,"127.0.0.1");

console.log("server is running");