import express				from 'express';
import usersRoutes			from './users';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/users', usersRoutes);


export default router;
