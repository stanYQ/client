/**
 *操作数据库的基本操作 
 * 
 */
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',//数据库所在的服务器的域名或者IP地址
  user     : 'root',//登录数据库的账号
  password : '123456',//密码
  database : 'book'//数据库的密码
});
//执行连接操作
connection.connect();

// // //插入数据的查询语句
// let sql = 'insert into book set ?';
// //将要插入的数据
// let data = {
//     name:'明朝那些事',
//     author:'当年明月',
//     category:'文学',
//     description:'明朝的历史'
// }
 
//更新数据
// let sql = 'update book set name=?,author=?,category=?,description=? where id = ?';
// let data = ['浪潮之巅','吴军','计算机','IT巨头的兴衰史',5]

//删除数据
// let sql = "delete from book where id =?";
// let data = [15];

// 查询
let sql = 'select * from book ';
let data = null;
connection.query(sql,data, function (error, results, fields) {
  if (error) throw error;
      console.log('查询到数据是');
      console.log(results);
});
 
connection.end()