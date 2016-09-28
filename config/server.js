const serverConf = {    
    normalizePort: val => {
	let port = parseInt(val, 10);
	if (isNaN(port)) return val;
	if (port >= 0)   return port;
	return false;
    },

    onError: (port, error) => {
	if (error.syscall !== 'listen') throw error;
	let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

	switch (error.code) {
	case 'EACCES':     console.error(bind + ' requires elevated privileges'); process.exit(1); break;
	case 'EADDRINUSE': console.error(bind + ' is already in use');            process.exit(1); break;
	default: throw error;
	}
    }
};
export default serverConf;
