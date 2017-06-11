import express		from 'express';
import validation	from './../helpers/validation';
import accessControl	from './../helpers/access';
import usersCtrl	from './../controllers/users';

const usersRoutes = express.Router();
const userRoutes = express.Router();

usersRoutes.route('/')
    .get(accessControl.authorize(['admin']),
	 usersCtrl.getAll)
    .post(validation.body(['firstname', 'lastname', 'email', 'birthdate', 'password', 'role']),
	  usersCtrl.create);

userRoutes.route('/:id')
    .get(accessControl.authorize(['admin', 'self']),
	 usersCtrl.getBy)
    .put(accessControl.authorize(['admin', 'self']),
	 usersCtrl.updateBy)
    .delete(accessControl.authorize(['admin', 'self']),
	    usersCtrl.deleteBy);

export {userRoutes, usersRoutes};
