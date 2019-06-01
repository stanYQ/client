const data = require('./data.json');
const fs = require('fs');
const config = require('./config');

module.exports = {
    showIndex: (req, res) => {
        res.render('index', { list: data });
    },

    toAdd: (req, res) => {
        res.render('addBook');
    },

    addBook: (req, res) => {
        console.log(req.body)
        let book = {
            id: data.length + 1,
            name: req.body.name,
            author: req.body.auth0r,
            category: req.body.category,
            desc: req.body.desc
        }

        data.push(book);
        fs.writeFile(config.dataPath, JSON.stringify(data), (err) => {
            if (err) throw err;
            res.redirect(302, '/');
        })
    },

    toEdit: (req, res) => {
        data.forEach(element => {
            if (req.query.id === element.id.toString()) {
                res.render('editBook', { book: element });
                return;
            }
        });
    },

    editBook: (req, res) => {
        let book = {
            id: req.query.id,
            name: req.body.name,
            author: req.body.auth0r,
            category: req.body.category,
            desc: req.body.desc
        }
        data.forEach(element => {
            if (req.query.id === element.id.toString()) {
                for (let key in book) {
                    element[key] = book[key];
                }
                return;
            }
        })
        fs.writeFile(config.dataPath, JSON.stringify(data), (err) => {
            if (err) throw err;
            res.redirect(302, '/');
        })
    },

    removeBook:(req,res)=>{
        var newData = [];
       for(item of data){
           if(item.id.toString() != req.query.id){
               newData.push(item);
           }
       }
       fs.writeFile(config.dataPath, JSON.stringify(newData), (err) => {
        if (err) throw err;
        res.redirect(302, '/');
    })
    }
}