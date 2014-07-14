var connect = require('connect');
var serveStatic = require('serve-static');

var path=__dirname+'/www';
var port=process.env.PORT || 9000;
connect().use(serveStatic(path)).listen(port);

