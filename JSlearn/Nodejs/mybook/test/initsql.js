//将data.json 文件中的数据拼接成SQL语句

const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname,'../','data.json'),(err,data)=>{
    if(err)throw err;
    let array = [];
    const dataObject = JSON.parse(data);
    dataObject.forEach(item => {
       let sql = `insert into book (name,author,category,description) values ("${item.name}","${item.author}","${item.category}","${item.desc}");`; 
       array.push(sql);
    });

    fs.writeFile(path.join(__dirname,'data.sql'),array.join(''),(err)=>{
        if(err){throw err}
    })

})