import express		from	 'express';
import logger		from	 'morgan';
import bodyParser	from	 'body-parser';
import cookieParser	from	 'cookie-parser';

const app	= express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

export default app;
