import ws		from  'ws';
import createServer	from  './config/server';
import dbConf		from  './config/db';
import app		from  './config/app';
import ext		from  './config/extends';
import routes		from  './FRONT/routes/index';
import apiRoutes	from  './API/routes/index';
import wsRoutes		from  './WS';

const port	= '3000';
const server	= createServer(app, port);
// const wsServer	= ws.Server;
// const wss	= new wsServer({server, path: '/'});

ext.extendNativeObjects();

// mount routes
app.use('/', routes);
app.use('/api', apiRoutes);
// wsRoutes(wsServer, server);

(async function main() {
    await dbConf.initDB();
    server.listen(port);
    console.log('server listening on port ' + port);
})();

// wss.on('connection', ws => {
//     ws.on('message', msg => {
// 	console.log('received: %s', msg);
//     });
//     ws.send('something');
// });
