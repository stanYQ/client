var fs = require('fs');
//读取文件流
var myReadStream = fs.createReadStream(__dirname+'/readMe.txt','utf-8');//创建并接收 读取文件流对象

//写入文件流
var myWriteStream = fs.createWriteStream(__dirname + '/StreamWrite2.txt');
// 流 传输数据是通过 buffer 缓存区一部分一部分的传输 chunk 就是一小部分的数据
var time = 1;
myReadStream.on('data',function(chunk){//绑定一个data事件 
    console.log("=======================以写入第"+time+"部分数据=================");
    myWriteStream.write(chunk);//将接收到的数据写入
    time++;
})


myReadStream.pipe(myWriteStream);//pipe 的参数是数据接收对象
