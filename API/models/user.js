const create = async (body) => {
    await db.run(`INSERT INTO user(firstname, lastname, email, password, role)
                  VALUES(?, ?, ?, ?, ?)`,
		 [body.firstname,  body.lastname,  body.email,  body.password,  body.role]);

    body.id = db.lastInsertRowId;
    return body;
};

const getAll = () => {
    //    let res = DB.query("SELECT * FROM users");
    //    let res = ORM.users.fetchAll();

    return "nooo";
};


const getBy = async (obj) => {
    let db_rows = Object.keys(obj).map(key => `${key} = ?`).join(' AND ');
    let params =  Object.keys(obj).map(key => obj[key]);
    let res = await db.all(`SELECT * FROM user WHERE ${db_rows};`, params);
    return res ? res : false;
};

const update = async (id, obj) => {
    let db_rows = Object.keys(obj).map(key => `${key} = ?`).join(',');
    let db_values = Object.keys(obj).map(key => `${obj[key]}`);

    let query = await db.run(`UPDATE user
                  SET ${db_rows} WHERE id = ?;`, db_values.concat([id]));

    return (query.stmt.changes == 0)
	? false
	: await db.all(`SELECT * FROM user WHERE id = ?`, [id]);
};

const del = async (id) => {
    let query = await db.run(`DELETE FROM user WHERE id = ?;`, [id]);

    return (query.stmt.changes != 0);
};


export default {create, getAll, getBy, update, del };
