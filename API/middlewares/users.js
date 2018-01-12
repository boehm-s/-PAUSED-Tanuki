import jwt		from 'jsonwebtoken';
import bcrypt		from 'bcrypt';
import _		from 'lodash';
import usersModel	from './../models/users';


const create = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const jwtBody = _.pick(req.body, ['firstname', 'name', 'email']);

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

const getById = async (req, res, next) => {
    const users = await usersModel.getBy({id: req.params.id});

    return (users.err)
	? next(users.err)
	: res.json(users);
};

const updateById = async (req, res, next) => {
    const  updatedUsers = await usersModel.update({id: req.params.id}, req.body.update);

    return (updatedUsers.err)
	? next(updatedUsers.err)
	: res.json(updatedUsers);
};

const deleteById = async (req, res, next) => {
    const deletedUsers = await usersModel.deleteBy({id: req.params.id});

    return (deletedUsers.err)
	? next(deletedUsers.err)
	: res.json(deletedUsers);
};

export default {create, getAll, getById, updateById, deleteById};
