import express from 'express';
import exampleCtrl from './../controllers/example';

const router = express.Router();

router.route('/')
    .get(exampleCtrl.test1, exampleCtrl.test2);

export default router;
