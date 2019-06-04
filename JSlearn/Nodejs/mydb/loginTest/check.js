const express = require('express');
const connectDB = require('../dbApiText/db');
const path = require('path');
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'));
})

app.get('/check',(req,res)=>{
    let sql = 'select count(*) as total from user where username=? and password = ?';
    let data = [req.query.username,req.query.password];
    console.log(req.query)
    connectDB(sql,data,(result)=>{
        if(result[0].total === 1){
            res.send('login success');
        }else{
            res.send('username or password is error');
        }
    })
})

app.listen(5050,()=>{
    console.log('server is running');
})