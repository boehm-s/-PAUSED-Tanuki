import jwt		from 'jsonwebtoken';
import bcrypt		from 'bcrypt';
import usersModel	from './../models/users';


const create = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const jwtBody = req.body.pick(['firstname', 'name', 'email']);

    jwt.sign({data: jwtBody}, 'this_is_so_secret', { expiresIn: 60 * 60 * 24 * 31});
    req.body.password = hash;
    const createdUser = await usersModel.create(req.body);

    return (createdUser.err)
	? next(createdUser.err)
	: res.json(createdUser);
};

const getAll = async (req, res, next) => {
    const allUsers = await usersModel.getAll();

    return (allUsers.err)
	? next(allUsers.err)
	: res.json(allUsers);
};

const getBy = async (req, res, next) => {
    req.body.filter = { id: req.params.id };
    const users = await usersModel.getBy(req.body.filter);

    return (users.err)
	? next(users.err)
	: res.json(users);
};

const updateBy = async (req, res, next) => {
    req.body.filter = { id: req.params.id };
    const  updatedUsers = await usersModel.update(req.body.filter, req.body.update);

    return (updatedUsers.err)
	? next(updatedUsers.err)
	: res.json(updatedUsers);
};

const deleteBy = async (req, res, next) => {
    req.body.filter = { id: req.params.id };
    const deletedUsers = await usersModel.deleteBy(req.body.filter);

    return (deletedUsers.err)
	? next(deletedUsers.err)
	: res.json(deletedUsers);
};

export default {create, getAll, getBy, updateBy, deleteBy};
