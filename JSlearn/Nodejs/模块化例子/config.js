var path = require('path');

module.exports = {
    port: 3000,
    dataPath: path.join(__dirname, 'data', 'data.json'),
    viewsPath: path.join(__dirname, 'views')
}