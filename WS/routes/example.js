const route = wss => {
    wss.on('connection', ws => {
	ws.on('message', msg => {
	});
    });
};

module.exports = route;
