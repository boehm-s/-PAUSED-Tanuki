import express from 'express';
import exampleRoutes from './example';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/example', exampleRoutes);

export default router;
