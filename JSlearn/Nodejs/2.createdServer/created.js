//引入http模块
var http = require('http');

//创建服务器方法
var server = http.createServer((req, res) => {
    // console.log("客户端向服务器发送请求" + req.url);
    //客户端发送两次请求
    //1、客户端向服务器发送请求/       为 127.0.01 地址请求 页面
    //2、客户端向服务器发送请求/favicon.ico  title 图标的请求
    if (req.url !== '/favicon.ico') {// facicon.ico 请求
        console.log("客户端向服务器发送请求" + req.url);
        res.writeHead(200, { "Content-type": "text/plain" });// 纯文本数据 在 response 结束返回  
        //向请求发送响应头。 状态码是一个 3 位的 HTTP 状态码 最后一个参数 headers 是响应头
        res.end("server is working");  //返回到客户端
        //根据响应头的不同格式 可以返回不同文件  
    }

})

//服务对象监听服务器地址以及端口号

server.listen(8888, "127.0.0.1");

console.log("server is running");