const express = require('express');
const template = require('express-art-template');
const bodyParser = require('body-parser');
const router = require('./router.js');
const config = require('./config.js');
const app = express();

app.set('views',config.viewsPath);
app.set('view engine','html');
app.engine('html',template);
//挂载参数处理中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//使用路由模块
app.use(router);


app.listen(config.port,()=>{
    console.log(`server is running path:http://localhost:${config.port}`);
})