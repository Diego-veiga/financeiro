import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import requestValidate from '../middleware/requestValidate';
import userSchema from '../schemas/userShemas';

const router = new Router();

router.post('/', requestValidate(userSchema.post, 'body'), userControllers.store);

export default router;
