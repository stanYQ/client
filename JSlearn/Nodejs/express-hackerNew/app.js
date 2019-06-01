let express = require('express');
let config = require('./config');
let router = require('./router');
// let template = require('express-art-template');
let template = require('ejs')
let app = express();


//建立模板引擎
app.engine('html',template.renderFile);

//设置 app与router关联
app.use(router);

//监听端口
app.listen(config.port,()=>{
    console.log(`server is running path:http://localhost:${config.port}`);
})