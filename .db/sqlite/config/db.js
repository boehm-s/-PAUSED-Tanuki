import db	from 'sqlite';

let conn = null;

module.exports = async (db) => {
    if (!conn) {
	conn = await Promise.resolve()
	.then(() => db.open('db.sqlite', { Promise }))
	.catch(err => console.error(err.stack));
	return conn;
    } else
	return conn;
};
