import db	from 'sqlite';

const initDB = async () => {
    await Promise.resolve()
	.then(() => {
	    console.log("init db");
	    global.db = db;
	    return db.open('./db.sqlite', { Promise });
	})
	.catch(err => console.error(err.stack));
};

export default {initDB};
