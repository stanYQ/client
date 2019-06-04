/**
 * 后台接口开发
 */
let bodyParaer = require('body-parser');
let router = require('./router');
let express = require('express');
let app = express('express');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParaer.urlencoded({extended:false}));
app.use(bodyParaer.json());

app.use(router);

app.listen(3000,()=>{
    console.log('server is running port:http://localhost:3000');
}) 