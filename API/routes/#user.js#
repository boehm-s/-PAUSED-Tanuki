import express		from 'express';
import usersCtrl	from './../controllers/users';
import accessControl	from './../controllers/access';

const router = express.Router();

router.route('/:id')
    .get(accessControl.authorize(['admin', 'self']), usersCtrl.getBy({id: req.params.id}))
    .put(accessControl.authorize(['admin', 'self']), usersCtrl.updateBy({id: req.params.id}))
    .delete(accessControl.authorize(['admin', 'self']), usersCtrl.deleteBy({id: req.params.id}));

export default router;
