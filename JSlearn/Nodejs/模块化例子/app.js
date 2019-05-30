var http = require('http');
var context = require('./context');
var router = require('./router');
var config = require('./config');

var app = http.createServer((req, res) => {

    context(req, res);
    router(req, res);

}).listen(config.port, () => {
    console.log('server is running');
})


