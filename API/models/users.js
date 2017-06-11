// you can 'import' your db here or your ORM conf

const users = [
    {id: 0, firstname: "Antoine", lastname: "DUPONT", email: "antoine.dupont@gmail.com",
     birthdate: 1494074194 , password: "6dsf4g3vc", role: 1},
    {id: 1, firstname: "Alexis", lastname: "DURAND", email: "alexis.durand@gmail.com",
     birthdate: 1494074194 , password: "erg7332", role: 0},
    {id: 2, firstname: "Romain", lastname: "ALEXANDRE", email: "romain.alexandre@gmail.com",
     birthdate: 1494074194 , password: "asf687s", role: 0},
    {id: 3, firstname: "Mireille", lastname: "DELOUVE", email: "mireille.delouve@gmail.com",
     birthdate: 1494074194 , password: "svd87d98a7", role: 0}
];

// const roles = [
//     {id: 0, role: "user", description: "just a user"},
//     {id: 1, role: "admin", description: "just an administrator, he has a lot of rights ... "}
// ];

const create = (body) => {
    users.push(body);
    return body;
};

const getAll = () => users;

const getByToken = (token) =>  users.filter(user => user.password === token)[0];

const getBy = (filter) => {
    if (0 === users.length) {
	return [];
    } else if (Object.keys(filter).filter(key => Object.keys(users[0]).includes(key)).length
	       !== Object.keys(filter).length) {
	return {
	    err: `The following fields doesn't exists :
${Object.keys(filter).filter(key => !Object.keys(users[0]).includes(key))}`
	};
    } else {
	return users.filter(user => Object
			    .keys(filter)
			    .filter(key => user[key] === filter[key]).length
			    === Object.keys(filter).length);
    }
};

const updateBy = (filter, updateObj) => {
    const filterKeys = Object.keys(filter);
    const updateKeys = Object.keys(updateObj);
    const filterIndexes = users
	  .filter(user => filterKeys.filter(key => user[key] === filter[key]).length === filterKeys.length)
	  .map(user => user.id);
    let err = null;

    users.filter(user => filterIndexes.includes(user.id))
    	.forEach(user => updateKeys
		 .forEach(updateKey => {
		     (user.hasOwnProperty(updateKey))
			 ? user[updateKey] = updateObj[updateKey]
			 : err = {err: `user has not the following column / key : ${updatekey}`};
		 }));

    return (null !== err)
	? err
	: users.filter(user => filterIndexes.includes(user.id));
};

const deleteBy = (filter) => {
    const filterKeys = Object.keys(filter);
    const filterIndexes = users
	  .filter(user => filterKeys.filter(key => user[key] === filter[key]).length === filterKeys.length)
	  .map(user => user.id);
    const deletedUsers = users.filter(user => filterIndexes.includes(user.id));

    users.forEach(user => (filterIndexes.includes(user.id)) ? delete users[user.id] : null);
    return deletedUsers;
};

export default {getAll, getByToken, create, getBy, updateBy, deleteBy};
