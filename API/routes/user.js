import express		from 'express';
import usersCtrl	from './../controllers/users';
import accessControl	from './../controllers/access';

const router = express.Router();

router.route('/:id')
    .get(accessControl.authorize(['admin', 'self']),
	 usersCtrl.getBy)
    .put(accessControl.authorize(['admin', 'self']),
	 usersCtrl.updateBy)
    .delete(accessControl.authorize(['admin', 'self']),
	    usersCtrl.deleteBy);

export default router;
