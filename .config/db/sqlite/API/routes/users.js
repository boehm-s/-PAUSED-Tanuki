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

router.route('/:uid')
    .get(accessControl.authorize(['admin', 'normal']),
	 validation.body({allowed: []}),
	 validation.params(['uid']),
	 userCtrl.getById)
    .put(accessControl.authorize(['admin']),
	 validation.body({allowed: ['lastname', 'firstname', 'email', 'password', 'role']}),
	 validation.params(['uid']),
	 userCtrl.update)
    .delete(accessControl.authorize(['admin']),
	 validation.body({allowed: []}),
	    validation.params(['uid']),
	    userCtrl.del);

export default router;
