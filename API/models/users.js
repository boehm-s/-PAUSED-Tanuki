// you can 'import' your db here or your ORM conf

var users = [
    {id: 0, firstname: "Antoine", lastname: "DUPONT",  email: "antoine.dupont@gmail.com", birthdate: 1494074194 , password: "6dsf4g3vc", role: 1},
    {id: 1, firstname: "Alexis", lastname: "DURAND",  email: "alexis.durand@gmail.com", birthdate: 1494074194 , password: "erg7332", role: 0},
    {id: 2, firstname: "Romain", lastname: "ALEXANDRE",  email: "romain.alexandre@gmail.com", birthdate: 1494074194 , password: "asf687s", role: 0},
    {id: 3, firstname: "Mireille", lastname: "DELOUVE",  email: "mireille.delouve@gmail.com", birthdate: 1494074194 , password: "svd87d98a7", role: 0}
];

var roles = [
    {id: 0, role: "user", description: "just a user"},
    {id: 1, role: "admin", description: "just an administrator, he has a lot of rights ... "}
];

const create = async (body) => {
    users.push(body);
    return body;
};

const getAll = () => {
    return users;
};

const getByToken = async (token) =>  users.filter(user => user.password == token)[0];

const getBy = async (filter) => {
    if (users.length === 0)
	return [];
    else if (Object.keys(filter).filter(key => Object.keys(users[0]).includes(key)).length != Object.keys(filter).length)
	return {err: `The following fields doesn't exists : ${Object.keys(filter).filter(key => !Object.keys(users[0]).includes(key))}`};
    else
	return users.filter( user => Object.keys(filter).filter(key => user[key] === filter[key]).length === Object.keys(filter).length);
};

const updateBy = async (filter, updateObj) => {
    const filterKeys = Object.keys(filter);
    const updateKeys = Object.keys(updateObj);
    const filterIndexes = users
	  .filter(user => filterKeys.filter(key => user[key] === filter[key]).length === filterKeys.length)
	  .map(user => user.id);

    let err = null;
    users.filter(user => filterIndexes.includes(user.id))
    	.forEach(user => updateKeys
		 .forEach(updateKey => {
		     if (user.hasOwnProperty(updateKey))
			 user[updateKey] = updateObj[updateKey];
		     else
			 err = {err: `user has not the following column / key : ${updatekey}`};
		 }));
    return (err != null)
	? err
	: users.filter(user => filterIndexes.includes(user.id));
};

const deleteBy = async (filter) => {
    const filterKeys = Object.keys(filter);
    const filterIndexes = users
	  .filter(user => filterKeys.filter(key => user[key] === filter[key]).length === filterKeys.length)
	  .map(user => user.id);
    const deletedUsers = users.filter(user => filterIndexes.includes(user.id));

    users.forEach(user => {
	if (filterIndexes.includes(user.id))
	    delete users[user.id];
    });

    return deletedUsers;
};

export default {getAll, getByToken, create, getBy, updateBy, deleteBy};
