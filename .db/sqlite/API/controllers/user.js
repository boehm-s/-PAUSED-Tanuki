import jwt		from 'jsonwebtoken';
import sha1		from 'sha1';
import usersModel	from './../models/user';


const create = async (req, res, next) => {
    req.body.password = sha1(req.body.password);
    let registered = await usersModel.create(req.body);

    return registered
	? res.status(201).end('User successfully created')
	: res.status(400).end('An error occured');
};

const getAll = (req, res, next) => {
    let allUsers = usersModel.getAll();
    res.json(allUsers);
};

const getBy = async (req, res, next) => {
    let users = await usersModel.getBy(req.body);
    return res.json(users);
};

const getById = async (req, res, next) => {
    let user = await usersModel.getBy({id: req.params.uid});
    return !user
	? res.status(404).end('User was not found')
	: res.json(user[0].pick(['id', 'lastname', 'firstname', 'email', 'role']));
};

const update = async (req, res, next) => {
    if (req.body.password)
	req.body.password = sha1(req.body.password);

    let newUser = await usersModel.update(req.params.uid, req.body);

    return (!newUser)
	? res.status(404).end('User was not found')
	: res.end(' User successfully modified'); //res.json(newUser);
};


const del = async (req, res, next) => {
    let delUser = await usersModel.del(req.params.uid);

    return (!delUser)
	? res.status(404).end('User was not found')
	: res.end(' User successfully deleted'); //res.json(newUser);
};


export default {create, getAll, getBy, update, del, getById};
