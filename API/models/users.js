// you can 'import' your db here or your ORM conf

var users = [
    {id: 0, firstname: "Antoine", lastname: "DUPONT",  email: "antoine.dupont@gmail.com", birthdate: 1494074194 , password: "6dsf4g3vc", role: 1},
    {id: 1, firstname: "Alexis", lastname: "DURAND",  email: "alexis.durand@gmail.com", birthdate: 1494074194 , password: "erg7332", role: 0},
    {id: 2, firstname: "Romain", lastname: "ALEXANDRE",  email: "romain.alexandre@gmail.com", birthdate: 1494074194 , password: "asf687s", role: 0},
    {id: 3, firstname: "Mireille", lastname: "DELOUVE",  email: "mireille.delouve@gmail.com", birthdate: 1494074194 , password: "svd87d98a7", role: 0}
];

var roles = [
    {id: 0, role: "user", description: "just a user"},
    {id: 2, role: "admin", description: "just an administrator, he has a lot of rights ... "}
];

const create = async (body, token) => {
    body.token = token;
    users.push(body);
    return body;
};

const getAll = () => {
    return users;
};

const getByToken = async (token) =>  users.filter(user => user.token == token)[0];

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
