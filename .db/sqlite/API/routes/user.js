import express		from 'express';
import userCtrl		from './../controllers/user';
import accessControl	from './../controllers/access';
import validation	from './../controllers/validation';

const router = express.Router();

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
