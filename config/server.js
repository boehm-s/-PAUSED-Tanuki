import http from 'http';
const debug = require('debug')('es6-express-api:server');

const createServer = (app, port) => {
    const server = http.createServer(app);

    const onError = (error) => {
	const bind = ('string' === typeof port)
		? `Pipe ${port}`
		: `Port ${port}`;

	if ('listen' !== error.syscall)
	    throw error;

	if ('EACCES' === error.code) {
	    throw new Error(`${bind} requires elevated privileges`);
	} else if ('EADDRINUSE' === error.code ) {
	    throw new Error(`${bind} is already in use`);
	} else
	    throw error;
    };

    const onListening = () => {
	const addr = server.address();
	const bind = ( 'string' === typeof addr)
		? `pipe ${addr}`
		: `port ${addr.port}`;

	debug(`Listening on ${bind}`);
    };

    server.on('error', onError);
    server.on('listening', onListening);

    return server;
};

export default createServer;
