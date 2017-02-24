import express from 'express';
import exampleRoutes from './example';
import usersRoutes from './users';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/example', exampleRoutes);
router.use('/users', usersRoutes);


export default router;
