//api 部分的路由
var express = require('express');
var router = express.Router();

router.get('/api',(req,res)=>{
    res.send('api');
})

module.exports = router;