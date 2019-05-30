//该模块负责进行路由判断
var handler = require('./handler');

module.exports = (req, res) => {
    //将请求路径转换成小写
    var url = req.url.toLocaleLowerCase();
    var method = req.method.toLocaleLowerCase();
    //进行设计路由f
    if (url === '/' || url === '/index' && method === 'get') {
        handler.index(req, res);
    } else if (url === '/submit' && method === 'get') {
        //读取submit.html
        handler.submit(req, res);
    } else if (url.startsWith('/item') && method === 'get') {
        handler.seach(req, res);
    } else if (url.startsWith('/add') && method === 'get') {
        handler.get(req, res);
    } else if (url.startsWith('/add') && method == 'post') {
        handler.post(req, res);
    } else if (url == '/login' && method == 'get') {
        handler.login(req, res);
    }
    else if (url.indexOf('/public/') === 0) {
        //静态资源配置
        handler.static(req,res); 
    } else {
        handler.error(req,res);
    }
}


