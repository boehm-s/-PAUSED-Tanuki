'use strict';

var http = require('http');
var debug = require('debug')('LetVibe:server');

module.exports = function (app) {

			var server = http.createServer(app);
			server.on('error', onError);
			server.on('listening', onListening);

			return server;

			function normalizePort(val) {
						var port = parseInt(val, 10);

						if (isNaN(port)) return val;

						if (port >= 0) return port;

						return false;
			}

			function onError(error) {
						if (error.syscall !== 'listen') throw error;

						var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

						switch (error.code) {
									case 'EACCES':
												console.error(bind + ' requires elevated privileges');
												process.exit(1);
												break;
									case 'EADDRINUSE':
												console.error(bind + ' is already in use');
												process.exit(1);
												break;
									default:
												throw error;
						}
			}

			function onListening() {
						var addr = server.address();
						var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
						debug('Listening on ' + bind);
			}
};