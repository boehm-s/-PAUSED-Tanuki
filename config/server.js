import http	from	'http';
import https	from	'https';
import fs	from	'fs';

const debug = require('debug')('es6-express-api:server');

const createServer = (app, port) => {
    var httpsServer = https.createServer({
	key: fs.readFileSync('snakeoil.key'),
	cert: fs.readFileSync('snakeoil.pem')
    }, app);

    httpsServer.on('error', onError);
    httpsServer.on('listening', onListening);

    const normalizePort = val => {
	var port = parseInt(val, 10);
	if (isNaN(port)) return val;
	if (port >= 0)   return port;
	return false;
    };

    function onError(error) {
	if (error.syscall !== 'listen')
	    throw error;
	var bind = (typeof port === 'string')
		? `Pipe ${port}`
		: `Port ${port}`;

	if (error.code == 'EACCES') {
	    console.error(bind + ' requires elevated privileges');
	    process.exit(1);
	} else if (error.code == 'EADDRINUSE') {
	    console.error(bind + ' is already in use');
	    process.exit(1);
	} else
	    throw error;
    };

    function onListening()  {
	var addr = httpsServer.address();
	var bind = (typeof addr === 'string')
		? `pipe ${addr}`
		: `port ${addr.port}`;

	debug('Listening on ' + bind);
    };

    return httpsServer;
};

export default createServer;
