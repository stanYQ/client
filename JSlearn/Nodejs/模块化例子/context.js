//本模块负责对req和res进行扩展
//1、res 增加一个query属性，该属性中保存的就是用户 发送 get请求提交的数据
//2、为 req 增加一个 pathname属性
//3、为 res 增加一个 render 函数

//mime.getType 可以根据url路径判断文件类型
var mime = require('mime');
//underscore 是一个工具库
let _ = require('underscore');
let fs = require('fs');
let URL = require('url');
module.exports = (req, res) => {
    var urlObj = URL.parse(req.url.toLocaleLowerCase(), true);
    req.query = urlObj.query;
    req.pathname = urlObj.pathname;

    //res 是一个对象
    //在将render挂载到res 后期使用 只需要通过 res.render() 进行文件以及页面的调用
    //第二个参数用来传递模板数据
    res.render = (fileName, tplData) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                res.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                })
                res.end('404 Not Found');
            }
            //如果存在模板数据 使用template进行模板替换 
            if (tplData) {
                var fn = _.template(data.toString('utf-8'));
                data = fn(tplData);
            }
            //mime.getType 可以根据url路径判断文件类型
            res.setHeader('Content-Type', mime.getType(fileName));
            res.end(data);
        })
    }

}