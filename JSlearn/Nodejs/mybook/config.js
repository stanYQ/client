const path = require('path');
module.exports = {
    port: 3000,
    viewsPath: path.join(__dirname,'views'),
    publicPath:path.join(__dirname,'public'),
    dataPath:path.join(__dirname,'data.json')

}