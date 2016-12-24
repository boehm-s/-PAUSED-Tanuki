import createServer	from	 './config/server';
import app		from	 './config/express';
import routes		from	 './FRONT/routes/index';
import apiRoutes	from	 './API/routes/index';
import wsRoutes		from	 './WS/routes/index';

const port	= (process.env.PORT || '3000');
const server	= createServer(app, port);
const expressWs = require('express-ws')(app);


// mount routes
app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/ws', wsRoutes);

server.listen(port);
console.log('server listening on port ' + port);
