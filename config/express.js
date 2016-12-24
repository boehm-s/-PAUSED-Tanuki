import express		from	 'express';
import bodyParser	from	 'body-parser';
import logger		from	 'morgan';
import cookieParser	from	 'cookie-parser';
import path		from	 'path';
import sass		from	 'node-sass-middleware';

const app	= express();
const frontRoot = __dirname + '/../FRONT/';
const apiRoot	= __dirname + '/../API/';
const wsRoot	= __dirname + '/../WS/';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(frontRoot, 'public')));
app.use(sass({
    src: path.join(frontRoot, 'public/sass'),
    dest: path.join(frontRoot, 'public/css'),
    indentedSyntax: true,
    sourceMap: true
}));

app.set('views', path.join(frontRoot, 'views'));
app.set('view engine', 'jade');

export default app;
