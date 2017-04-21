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


const getBy = async (obj) => {
    let db_rows = Object.keys(obj).map(key => `${key} = ?`).join(' AND ');
    let params =  Object.keys(obj).map(key => obj[key]);
    let res = await db.all(`SELECT * FROM user WHERE ${db_rows};`, params);
    return res ? res : false;
};

export default {create, getAll, getBy };
