import ws		from  'ws';
import createServer	from  './config/server';
import app		from  './config/app';
import routes		from  './FRONT/routes/index';
import apiRoutes	from  './API/routes/index';
import wsRoutes		from  './WS';

const port	= (process.env.PORT || '3000');
const server	= createServer(app, port);
const wsServer	= ws.Server;
const wss	= new wsServer({server, path: '/'});

Object.prototype.pick = function(keys) {
    return Object.keys(this)
	.filter(key => keys.includes(key))
	.reduce((obj, key) => {
	    obj[key] = this[key];
	    return obj;
	}, {});
};

Array.prototype.equals = array => {
    if (!array || this.length != array.length)
	return false;

    var i, l;
    for (i = 0, l = this.length; i < l; i++) {
	if (this[i] instanceof Array && array[i] instanceof Array)
	    if (!this[i].equals(array[i]))
		return false;
	else if (this[i] != array[i])
	    return false;
    }
    return true;
};


// mount routes
app.use('/', routes);
app.use('/api', apiRoutes);
wsRoutes(wsServer, server);

server.listen(port);
console.log('server listening on port ' + port);

wss.on('connection', ws => {
    ws.on('message', msg => {
	console.log('received: %s', msg);
    });
    ws.send('something');
});
