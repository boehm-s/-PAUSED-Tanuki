import jwt		from 'jsonwebtoken';
import sha1		from 'sha1';
import usersModel	from './../models/users';


const create = async (req, res, next) => {
    req.body.password = sha1(req.body.password);
    let registered = await usersModel.create(req.body);

    return registered
	? res.status(201).end('User successfully created')
	: res.status(400).end('An error occured');
};

const getAll = async (req, res, next) => {
    let allUsers = await usersModel.getAll();
    allUsers = allUsers.map(user => user.pick(['id', 'lastname', 'firstname', 'email', 'role']));
    res.json(allUsers);
};

const getBy = async (req, res, next) => {
    let users = await usersModel.getBy(req.app.get('db'), req.body);
    return res.json(users);
};


const search = async (req, res, next) => {
    let allUsers = await usersModel.getAll();
    allUsers = allUsers.map(user => user.pick(['id', 'lastname', 'firstname', 'email', 'role']));
    allUsers = allUsers.filter(user => user.lastname == req.query.q || user.email == req.query.q);

    if (req.query.count) {
	let count = parseInt(req.query.count);
	allUsers = allUsers.filter((user, i) => i < count);
    }

    return (allUsers.length == 0)
	? res.status(404).end('No user found')
	: res.json(allUsers);
};

export default {create, getAll, getBy, search};
