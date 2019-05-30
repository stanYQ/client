//该模块负责对json文件进行操作
let fs = require('fs');
module.exports = {
    readNewsData: (filename, callback) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            //如果第一次访问网站 data.json 文件不存在
            if (err && err.code != 'ENOENT') {
                throw err;
            }
            //将获取到的Json格式字符串转成对象
            let list = JSON.parse(data || '[]');
            callback(list);
        })
    },
    writeNewsData: (filename, data, callback) => {
        fs.writeFile(filename, data, (err) => {
            if (err) throw err;
            callback();
        })
    }
}