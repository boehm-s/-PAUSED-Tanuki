import fs from 'fs';

const routeFolder = __dirname + '/routes';

const router = (wsServer, server) => {
    fs.readdir(routeFolder, (err, files) => {
	if (err)
	    return err;

	files
	    .filter(file => file[0] != '.')
	    .forEach(file => {
		let path = `/${file.split('.')[0]}`;
		let wss = new wsServer({server, path});
		let route = require(`${routeFolder}/${path}`);
		route(wss);
	    });

	return true;
    });
};

export default router;
