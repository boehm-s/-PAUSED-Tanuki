import express		from 'express';
import usersCtrl	from './../controllers/users';
import accessControl	from './../controllers/access';

const router = express.Router();

router.route('/')
    .get(accessControl.authorize(['admin']), usersCtrl.getAll)
    .post(usersCtrl.create);

export default router;
