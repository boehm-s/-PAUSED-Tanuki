import express		from 'express';
import usersCtrl	from './../controllers/users';
import accessControl	from './../controllers/access';
import validation	from './../controllers/validation';

const router = express.Router();

router.route('/')
    .get(accessControl.authorize(['admin', 'normal']),
	 usersCtrl.getAll)
    .post(accessControl.authorize(['admin']),
	  validation.body({required: ['lastname', 'firstname', 'email', 'password', 'role']}),
	  usersCtrl.create);

router.route('/search')
    .get(accessControl.authorize(['admin', 'normal']),
	 validation.query({required: ['q'], allowed: ['count']}),
	 usersCtrl.search);

export default router;
