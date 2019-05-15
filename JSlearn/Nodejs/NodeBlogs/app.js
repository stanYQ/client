//加载express模块
var express = require('express');

//加载数据库模块
var mongoose = require('mongoose');

//模板引擎配置
var swig = require('swig');

//创建APP应用 => NodeJS Http.createServer();
var app = express();

//设置静态文件托管
app.use('/public',express.static(__dirname + '/public'));

//定义模板引擎，使用swig.renderFile方法解析后缀为HTML对的文件
app.engine('html',swig.renderFile);

//设置模板存放的目录
app.set('views','./views');

//注册模板引擎
app.set('view engine','html');

//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});


/*
 *根据不同功划分模块
 */
 app.use('/admin',require('./routers/admin'));
 app.use('/api',require('./routers/api'));
 app.use('/api',require('./routers/main'));


//数据库连接
mongoose.connect('mongodb://todoapp:todoapp@todo-shard-00-00-s8uvt.mongodb.net:27017,todo-shard-00-01-s8uvt.mongodb.net:27017,todo-shard-00-02-s8uvt.mongodb.net:27017/test?ssl=true&replicaSet=todo-shard-0&authSource=admin&retryWrites=true',(err)=>{
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8081);
    }
});
//监听URL请求

//用户发送http请求 -> url ->服务器解析路由 ->找到匹配的规则 -> 执行绑定的函数 ->返回对应内容

// 解析路由存在分支

//public->静态的->直接读取指定目录下的文件，返回给用户

//->动态的 -> 处理业务逻辑 -> 加载模板 -> 返回给用户
