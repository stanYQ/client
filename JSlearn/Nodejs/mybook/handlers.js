const data = require('./data.json');
const fs = require('fs');
const connectDB = require('./db');
const config = require('./config');

module.exports = {
    showIndex: (req, res) => {
        //从数据库中读取数据
        let sql = 'select * from book';
        let data = null;
        connectDB(sql, data, (result) => {
            res.render('index', { list: result });
        })
        // res.render('index', { list: data });
    },

    toAdd: (req, res) => {
        res.render('addBook');
    },

    addBook: (req, res) => {
        //向数据库添加数据
        let book = {
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            description: req.body.desc
        }

        var sql = 'insert into book set ?';
        connectDB(sql, book, (result) => {
            if (result.affectedRows >= 1) {
                res.redirect('/');
            }
        })
        //json 储存数据
        // let book = {
        //     id: data.length + 1,
        //     name: req.body.name,
        //     author: req.body.auth0r,
        //     category: req.body.category,
        //     description: req.body.desc
        // }
        // data.push(book);
        // fs.writeFile(config.dataPath, JSON.stringify(data), (err) => {
        //     if (err) throw err;
        //     res.redirect(302, '/');
        // })
    },

    toEdit: (req, res) => {
        let sql = 'select * from book where id = ?';
        let selectID = [req.query.id];
        connectDB(sql, selectID, (result) => {
            res.render('editBook', { book: result[0] });

        })
        // data.forEach(element => {
        //     if (req.query.id === element.id.toString()) {
        //         res.render('editBook', { book: element });
        //         return;
        //     }
        // });
    },

    editBook: (req, res) => {
        let sql = 'update book set name=?,author=?,category=?,description=? where id = ?';
        let data = [req.body.name, req.body.author, req.body.category, req.body.desc, req.query.id];
        connectDB(sql, data, (result) => {
            if (result.affectedRows) {
                res.redirect(302, '/');
            }
        })

        // let book = {
        //     id: req.query.id,
        //     name: req.body.name,
        //     author: req.body.auth0r,
        //     category: req.body.category,
        //     desc: req.body.desc
        // }
        // data.forEach(element => {
        //     if (req.query.id === element.id.toString()) {
        //         for (let key in book) {
        //             element[key] = book[key];
        //         }
        //         return;
        //     }
        // })
        // fs.writeFile(config.dataPath, JSON.stringify(data), (err) => {
        //     if (err) throw err;
        //     res.redirect(302, '/');
        // })
    },

    removeBook: (req, res) => {
        // var newData = [];
        // for (item of data) {
        //     if (item.id.toString() != req.query.id) {
        //         newData.push(item);
        //     }
        // }
        // fs.writeFile(config.dataPath, JSON.stringify(newData), (err) => {
        //     if (err) throw err;
        //     res.redirect(302, '/');
        // })
        let sql = 'delete from book where id = ?';
        let data = [req.query.id];
        connectDB(sql, data, (result) => {
            if (result.affectedRows) {
                res.redirect(302, '/');
            }
        })
    }
}


//通过自己封装的connectDB 对数据库进行连接并操作