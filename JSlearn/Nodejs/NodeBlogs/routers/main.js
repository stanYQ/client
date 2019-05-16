//前台部分的路由
var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('main/index');
})

module.exports = router;