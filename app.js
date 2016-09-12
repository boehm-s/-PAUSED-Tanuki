var app = require('./config/express');
var server = require('./config/server')(app);

var routes = require('./front/routes/index');
var users = require('./front/routes/users');


// mount routes
app.use('/', routes);
app.use('/users', users);



var port = (process.env.PORT || '3000');

server.listen(port);
console.log('server listening on port ' + port);




// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	    message: err.message,
	    error: err
	});
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
	message: err.message,
	error: {}
    });
});


