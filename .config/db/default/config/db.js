const initDB = async () => {
    await Promise.resolve()
	.then(() => {
	    console.warn("default: no db");
	    global.db = null;
	})
	.catch(err => console.error(err.stack));
};

export default {initDB};
