import jwt		from 'jsonwebtoken';
import bcrypt		from 'bcrypt';
import usersModel	from './../models/users';


const create = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const jwtBody = req.body.pick(['firstname', 'name', 'email']);

    jwt.sign({data: jwtBody}, 'this_is_so_secret', { expiresIn: 60 * 60 * 24 * 31});
    req.body.password = hash;
    let createdUser = await usersModel.create(req.body);

    return res.json(createdUser);
    return ret
	? {ha: "asdkhg"}
	: false;


};

const getAll = async (req, res, next) => {
    let allUsers = await usersModel.getAll();
    res.json(allUsers);
};

const getBy = async (req, res, next) => {
    req.body.filter = { id: req.params.id };
    let users = await usersModel.getBy(req.body.filter);
    return res.json(users);
};

const updateBy = async (req, res, next) => {
    req.body.filter = { id: req.params.id };
    let updatedUsers = await usersModel.update(req.body.filter, req.body.update);
    return (updatedUsers.err)
	? console.error(updatedUsers.err)
	: res.json(updatedUsers);
};

const deleteBy = async (req, res, next) => {
    req.body.filter = { id: req.params.id };
    let deletedUsers = await usersModel.deleteBy(req.body.filter);
    return res.json(deletedUsers);
};

export default {create, getAll, getBy, updateBy, deleteBy};
