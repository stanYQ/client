//该模块负责进行具体的业务逻辑处理
var tools = require('./tools');
var querystring = require('querystring');
var config = require('./config');

module.exports = {
    index: (req, res) => {
        tools.readNewsData(config.dataPath, (list_news) => {
            res.render(config.viewsPath + '/index.html', { list: list_news });
        })
    },

    submit: (req, res) => {
        //读取submit.html
        res.render(config.viewsPath + '/submit.html', res);
    },

    seach: (req, res) => {
        //1、获取当前的用户请求的id
        var id = req.query.id;
        //2、读取data.json 文件中的数据，根据id进行查找
        tools.readNewsData(config.dataPath, (list_news) => {
            var seach_new = null;
            list_news.forEach(element => {
                if (element.id == id) {
                    seach_new = element;
                }
            });
            res.render(config.viewsPath + '/details.html', { newInfo: seach_new });
        })
    },

    get: (req, res) => {
        //get 方法提交一条新闻
        //要获取到用户 get 提交的数据，需要用到 url 模块
        //通过get提交的数据，可以通过req.url 就可以获取（但是需要自己去截取字符串，然后获取想要的数据）
        //1、获取用户get提交过来的数据 
        //2、把用户提交的数据保存到data.json 

        tools.readNewsData(config.dataPath, (list_news) => {
            req.query().id = list_news.length;
            list_news.push(req.query);
            //将数组转成json格式的字符串
            let jsonSting = JSON.stringify(list_news);
            tools.writeNewsData(config.dataPath, jsonSting, () => {
                res.statusCode = 302;
                res.statusMessage = 'success';
                res.setHeader('Location', '/');
                res.end();
            })
        })
    },

    post: (req, res) => {
        tools.readNewsData(config.dataPath, (list) => {
            postBodyData(req, (postBody) => {
                postBody.id = list.length;
                list.push(postBody);
                tools.writeNewsData(config.dataPath, JSON.stringify(list), () => {
                    //跳转到主页
                    //重定向通过重置响应头实现
                    res.statusCode = 302;
                    res.statusMessage = 'success';
                    res.setHeader('Location', '/');
                    res.end();
                })
            })
        })
    },

    login: (req, res) => {
        res.render(config.viewsPath + '/login.html');
    },

    static: (req, res) => {
        res.render('.' + req.url.toLocaleLowerCase());
    },

    error: (req, res) => {
        res.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html;charset=utf-8'
        })
        res.end('404 Not Found');
    }

}

//封装了一个获取到 客户端post数据  
let postBodyData = (req, callback) => {
    //声明一个空数组用来接收一个个小Buffer 对象
    var array = [];
    //chunk 是post过来的一小部分数据 数据类型是Buffer
    req.on('data', (chunk) => {
        array.push(chunk);
    })
    //end事件触发表示数据提交结束
    req.on('end', () => {
        //将array中的buffer进行整合汇总
        var postBody = Buffer.concat(array);
        postBody = postBody.toString();
        //当前的postBody是查询字符串 需要转成json对象
        postBody = querystring.parse(postBody);
        callback(postBody);
    })
}
