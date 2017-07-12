import express		from 'express';
import usersCtrl	from './../controllers/users';

const usersRoutes = express.Router();
const userRoutes = express.Router();

usersRoutes.route('/')
    .get(usersCtrl.getAll)
    .post(usersCtrl.create);

userRoutes.route('/:id')
    .get(usersCtrl.getById)
    .put(usersCtrl.updateById)
    .delete(usersCtrl.deleteById);

export {userRoutes, usersRoutes};
