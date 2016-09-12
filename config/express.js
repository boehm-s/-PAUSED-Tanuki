var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');

var app = express();


var root = __dirname + '/../';
var frontRoot = root + 'front/';
var backRoot = root + 'back/';


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(frontRoot, 'views'));


// view engine setup
app.set('view engine', 'jade');

// sass setup
app.use(require('node-sass-middleware')({
    src: path.join(frontRoot, 'public'),
    dest: path.join(frontRoot, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

// public directory
app.use(express.static(path.join(frontRoot, 'public')));



module.exports = app;
