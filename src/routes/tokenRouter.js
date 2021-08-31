import { Router } from 'express';
import AuthController from '../controllers/authController';
import requestValidate from '../middleware/requestValidate';
import tokenSchemas from '../schemas/tokenShemas';

const router = new Router();

router.post('/', requestValidate(tokenSchemas.post, 'body'), AuthController.store);

export default router;
