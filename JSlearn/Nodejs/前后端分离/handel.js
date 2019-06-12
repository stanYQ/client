const connectDB = require('./db');
module.exports = {
    allBook: (req, res) => {
        //从数据库中读取数据
        let sql = 'select * from book';
        let data = null;
        connectDB(sql, data, (result) => {
            //向客户端的请求 响应 json格式的数据
            res.json(result);
        })
    },

    addBook: (req, res) => {
        let book = {
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            description: req.body.description
        }

        var sql = 'insert into book set ?';
        connectDB(sql, book, (result) => {
            if (result.affectedRows === 1) {
                // 通过向客户端 响应flag  客户端 根据此 进行判断
                res.json({ flag: 1 });//添加成功
            } else {
                res.json({ flag: 2 });//添加失败
            }
        })
    },

    editBook: (req, res) => {
        let sql = 'update book set name=?,author=?,category=?,description=? where id = ?';
        let data = [req.body.name, req.body.author, req.body.category, req.body.description, req.body.id];
        console.log(data)
        connectDB(sql, data, (result) => {
            if (result.affectedRows === 1) {
             res.json({flag:1});   
            }else{
                res.json({flag:2});
            }
        })

    },

    removeBook: (req, res) => {
        let sql = 'delete from book where id = ?';
        let data = [req.params.id];
        console.log(data)
        connectDB(sql, data, (result) => {
            if (result.affectedRows === 1) {
                res.json({ flag: 1 });
            } else {
                res.json({ flag: 2 });
            }
        })
    },

    getBookById: (req, res) => {
        let sql = 'select * from book where id = ?';
        let id = [req.params.id];
        connectDB(sql, id, (result) => {
            res.json(result[0]);
        })
    }
}

