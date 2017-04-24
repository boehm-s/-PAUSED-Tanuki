// you can 'import' your db here or your ORM conf

var users = [
    {id: 1, role: "user", name: "DUPONT", firstname: "Antoine", token: "6dsf4g3vc"},
    {id: 2, role: "admin", name: "DURAND", firstname: "Alexis", token: "erg7332"},
    {id: 3, role: "user", name: "ALEXANDRE", firstname: "Romain", token: "asf687s"},
    {id: 4, role: "user", name: "DELOUVE", firstname: "Mireille", token: "svd87d98a7"}
];


const create = async (body, token) => {
    body.token = token;
    users.push(body);
    return body;
};

const getAll = () => {
    //    let res = DB.query("SELECT * FROM users");
    //    let res = ORM.users.fetchAll();

    return users;
};

const getByToken = async (token) => {
    return users.filter(user => user.token == token)[0];
};

const getBy = async (obj) => {
    if (users.length === 0)
	return [];
    else if (Object.keys(obj).filter(key => Object.keys(users[0]).includes(key)).length != Object.keys(obj).length)
	return {err: `The following fields doesn't exists : ${Object.keys(obj).filter(key => !Object.keys(users[0]).includes(key))}`};
    else
	return users.filter( user => {
	    // match all keys in obj
	});

};

const update = async (id, obj) => {
    let index = users.map((user, i) => user.id === id ? i : 0).filter(n => n != 0)[0];
    Object.keys(users[index]).forEach(key => {
	if (obj.hasOwnProperty(key))
	    users[index][key] = obj[key];
    });
    return users[index];
};

export default {getAll, getByToken, create};
