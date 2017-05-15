import db	from 'sqlite';

const create = async (body) => {
    await db.run(`INSERT INTO user(firstname, lastname, email, password, role)
                  VALUES(?, ?, ?, ?, ?)`,
		 [body.firstname,  body.lastname,  body.email,  body.password,  body.role]);

    body.id = db.lastInsertRowId;
    return body;
};

const getAll = async () => {
    let allUsers = await db.all('SELECT * FROM user;');
    return allUsers;
};


const getBy = async (filter) => {
    let filterRows = Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
    let filterRowsValue =  Object.keys(filter).map(key => filter[key]);

    try {
	var res = await db.all(`SELECT * FROM user WHERE ${filterRows};`, filterRowsValue);
    } catch (e) {
	return {error: e};
    }

    return res;
};

const updateBy = async (filter, update) => {
    let filterRows = Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
    let filterRowsValue = Object.keys(filter).map(key => filter[key]);
    let updateRows = Object.keys(update).map(key => `${key} = ?`).join(', ');
    let updateRowsValue = Object.keys(update).map(key => update[key]);

    try {
	var query = await db.run(`UPDATE user SET ${updateRows} WHERE ${filterRows};`,
				 updateRowsValue.concat(updateRowsValue));
    } catch (e) {
	return {error: e};
    }

    return (query.stmt.changes === 0)
	? []
	: await db.all(`SELECT * FROM user WHERE  =  ${filterRows};`, filterRowsValue);
};

const deleteBy = async (filter) => {
    let filterRows = Object.keys(filter).map(key => `${key} = ?`).join(' AND ');
    let filterRowsValue = Object.keys(filter).map(key => filter[key]);

    try {
	var select = await db.run(`SELECT * FROM user WHERE ${filterRows};`, filterRowsValue);
	var query = await db.run(`DELETE FROM user WHERE  ${filterRows};`, filterRowsValue);
    } catch (e) {
	return {error: e};
    }

    return (query.stmt.changes === 0)
	? []
	: select;
};


export default {create, getAll, getBy, updateBy, deleteBy };
