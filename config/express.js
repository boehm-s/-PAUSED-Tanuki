import express from 'express';
import bodyParser from 'body-parser';
import logger  from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const frontRoot = './../FRONT/';
const apiRoot = './API/'; // api inside build


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

export default app;
