var http = require('http');
var fs = require('fs');

//创建server
var server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'charset=utf-8');
});

var wwwDir = 'F:/wamp64/www/client/JSlearn/Nodejs/Apache/www';


//监听server request
server.on('request', (req, res) => {
    var url = req.url;
    if (url == '/') {
        fs.readFile(wwwDir + '/index.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found');
            }
            var data = data.toString();

            fs.readdir(wwwDir, (err, files) => {
                if (err) {
                    return res.end('Can Not Find WWW Dir');
                }
                var content = '';
                files.forEach(element => {

                    
                    content += `
                      <tr>
                      <td data-value =""><a class='icon dir' href="">${element}</a></td>
                      <td class="detailsColumn" date-value="0"></td>
                      <td class="detailsColumn" date-value="0">2019年5月14日21:21:47</td>
                      </tr>
                      `;
                });

                data = data.replace('^_^', content);
                res.end(data);
            });


        })
    }
})


//绑定端口号
server.listen(3000, () => {
    console.log('server is running');
})
