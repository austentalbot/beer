var connect = require('connect');
var serveStatic = require('serve-static');
console.log(__dirname);
var path=__dirname+'/www';
console.log(path);
var port=process.env.PORT || 9000;
console.log(port);
connect().use(serveStatic(path)).listen(port);