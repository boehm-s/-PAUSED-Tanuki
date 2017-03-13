import jwt		from 'jsonwebtoken';
import bcrypt		from 'bcrypt';
import usersModel	from './../models/users';

const getAll = (req, res, next) => {
    let allUsers = usersModel.getAll();
    res.json(allUsers);
};

const register = (req, res, next) => {
    let body = req.body.pick(['firstname', 'name', 'email', 'phone']);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    body.password = hash;
    let token = jwt.sign({data: body}, 'this_is_so_secret_OUALLALA_OUALALA', { expiresIn: 60 * 60 * 24 * 31});
    let createdUser = usersModel.create(body, token);

    return res.json(createdUser);
};

export default {getAll, register};
