import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import requestValidate from '../middleware/requestValidate';
import userSchema from '../schemas/userShemas';
import authRequired from '../middleware/authRequired';

const router = new Router();

router.post('/', requestValidate(userSchema.post, 'body'), authRequired, userControllers.store);
router.get('/', authRequired, userControllers.show);
router.get(
  '/:id',
  requestValidate(userSchema.get, 'params'),
  authRequired,
  userControllers.index
);

export default router;
