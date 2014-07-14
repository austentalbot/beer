var connect = require('connect');
var serveStatic = require('serve-static');
var path=__dirname+'/www';
console.log(path);
connect().use(serveStatic(path)).listen(9000);