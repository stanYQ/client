/**
 * 数据操作的API
 */
const mysql = require('mysql');
module.exports = (sql, data, callback) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'book'
    })

    connection.connect();

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            throw error;
        }
        callback(results);
    });
    connection.end();
}