import express		from 'express';
import validation	from './../controllers/validation';
import accessControl	from './../controllers/access';
import usersCtrl	from './../controllers/users';

const router = express.Router();

router.route('/')
    .get(accessControl.authorize(['admin']),
	 usersCtrl.getAll)
    .post(validation.body(['firstname', 'lastname', 'email', 'birthdate', 'password', 'role']),
	  usersCtrl.create);

export default router;
