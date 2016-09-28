import http from 'http';
import app from './config/express';
import serverConf from './config/server';
import routes from './FRONT/routes/index';
import apiRoutes from './API/routes/index';


const debug = require('debug')('es6-express-api:server');
const server = http.createServer(app);
const port = serverConf.normalizePort(process.env.PORT || '3000');

app.set('port', port);

// mount routes
app.use('/', routes);
app.use('/api', apiRoutes);

server.listen(port);
console.log('server listening on port ' + port);

server.on('error', err => serverConf.onError(port, err));
server.on('listening', onListening);





function onListening()  {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// error handlers
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
