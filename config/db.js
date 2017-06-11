const initDB = async () => {
    await Promise.resolve()
	.then(() => {
	    global.db = null;
	}).catch(err => (err.stack));
};

export default {initDB};
