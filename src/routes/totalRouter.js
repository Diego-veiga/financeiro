import { Router } from 'express';
import billController from '../controllers/billController';
import authRequired from '../middleware/authRequired';

const router = new Router();

router.get('/:type', authRequired, billController.total);

export default router;
