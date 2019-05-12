// 引入mongoose模块
var mongoose = require('mongoose');

//链接数据库
mongoose.connect('mongodb://todoapp:todoapp@todo-shard-00-00-s8uvt.mongodb.net:27017,todo-shard-00-01-s8uvt.mongodb.net:27017,todo-shard-00-02-s8uvt.mongodb.net:27017/test?ssl=true&replicaSet=todo-shard-0&authSource=admin&retryWrites=true');

//编辑表格式
var todoSchema = new mongoose.Schema({
    item: String,
});

//创建表
var Todo = mongoose.model('Todo', todoSchema);
var Finnish = mongoose.model('Finnish', todoSchema);

//测试存储
// Finnish({item:'Hello Everyone!'}).save(function(err,data){
//     if(err) throw err;
//     console.log('Item saved');
// })

//引入数据解析模块
var bodyParser = require('body-parser');
//解析数据
var urlencodeParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    //获取数据
    app.get('/todo', function (req, res) {
        //查找当前数据是否存在数据 查找所有数据
        Todo.find({}, function (err, data) {
            //data是成功返回的数据
            if (err) throw err;
            var tododata = data;
            Finnish.find({}, function (err, data) {
                if (err) throw err;
                res.render('todo', {
                    todos: tododata,
                    Finnishs: data,
                })
            })
        });


    })

    //传递数据
    app.post('/todo/:action', urlencodeParser, function (req, res) {
        // data.push(req.body);//将ejs页面获取传递的数据 添加到data
        if (req.params.action == 'todoAdd') {
            Todo(req.body).save(function (err, data) {
                if (err) throw err;
                res.json(data);
            })
        }
        if (req.params.action == 'completeAdd') {
            Finnish(req.body).save(function (err, data) {
                if (err) throw err;
                res.json(data);
            })
        }

    });

    //删除数据
    app.delete('/todo/:action/:item', function (req, res) {
        if (req.params.action == 'todoRemove') {
            Todo.find({ item: req.params.item }).remove(function (err, data) {
                if (err) throw err;
                res.json(data);
            });
        }
        if (req.params.action == 'completedRemove') {
            Finnish.find({ item: req.params.item }).remove(function (err, data) {
                if (err) throw err;
                res.json(data);
            });
        }


        //    data = data.filter(function(todo){
        //         return req.params.item !== todo.item;
        //         //过滤 不相等就过滤掉 相等就return
        //     })
        //     res.json(data);//将data以json数据返回
    });
}

