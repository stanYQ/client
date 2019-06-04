let config = require('./config');
let tools = require('./tools');
let quertstring = require('querystring')
module.exports = {
    index: (req, res) => {
        tools.readNewsData(config.dataPath, (list) => {
            res.render(config.viewsPath + '/index.html', { list: list });
        })
    },

    submit: (req, res) => {
        res.render(config.viewsPath + '/submit.html');
    },

    item: (req, res) => {
        tools.readNewsData(config.dataPath, (list) => {
            list.forEach(element => {
                if (element.id.toString() === req.query.id) {
                    res.render(config.viewsPath + '/details.html', { newInfo: element })
                }
            });
        })
    },

    get: (req, res) => {

        tools.readNewsData(config.dataPath,(list)=>{
            req.query.id = list.length;
            list.push(req.query);
            tools.writeNewsData(config.dataPath,JSON.stringify(list),()=>{
                res.redirect(302,'/');
            })
        })
    },

    post: (req, res) => {
        let array = [];
        req.on('data',(chunk)=>{
           array.push(chunk);
        })
        req.on('end',()=>{
            let newData = Buffer.concat(array);
            newData = newData.toString('utf-8');
            //newData 是查询字符串  将其转成对象
            dataObject = quertstring.parse(newData);
            tools.readNewsData(config.dataPath,(list)=>{
                dataObject.id = list.length;
                list.push(dataObject);
                tools.writeNewsData(config.dataPath,JSON.stringify(list),()=>{
                    res.redirect(302,'/');
                })
            })
        })
    }

}