import express from 'express';
import usersCtrl from './../controllers/users';
import accessControl from './../helpers/access';

const router = express.Router();

router.route('/')
    .get(accessControl.admin, usersCtrl.getAll);

export default router;
