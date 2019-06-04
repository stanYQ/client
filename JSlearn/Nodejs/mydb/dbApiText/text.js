const connectDB = require('./db');

let sql = 'select * from book';

let data = null;

connectDB(sql,data,(results)=>{
    console.log(results);
})