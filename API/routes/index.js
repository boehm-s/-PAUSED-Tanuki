import express				from 'express';
import {userRoutes, usersRoutes}	from './users';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/user', userRoutes); // single user operations
router.use('/users', usersRoutes);


export default router;
