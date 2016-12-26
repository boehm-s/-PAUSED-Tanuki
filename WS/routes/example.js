const route = wss => {
    console.log(wss);
    wss.on('connection', ws => {
	console.log('connection to example route WS');
	ws.on('message', msg => {
	    console.log('from example : ', msg);
	});
    });
};

module.exports = route;
