import app from './config/express';
import createServer from './config/server';
import routes from './../FRONT/routes/index';

const server = createServer(app);
const port = (process.env.PORT || '3000');

// mount routes
app.use('/', routes);

server.listen(port);
console.log('server listening on port ' + port);




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
