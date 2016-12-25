import ws		from	 'ws';
import createServer	from	 './config/server';
import app		from	 './config/app';
import routes		from	 './FRONT/routes/index';
import apiRoutes	from	 './API/routes/index';

const port	= (process.env.PORT || '3000');
const server	= createServer(app, port);
const wsServer	= ws.Server;
const wss	= new wsServer({server});

// mount routes
app.use('/', routes);
app.use('/api', apiRoutes);


server.listen(port);
console.log('server listening on port ' + port);


wss.on('connection', ws => {
    ws.on('message', msg => {
	console.log('received: %s', msg);
    });
    ws.send('something');
});
