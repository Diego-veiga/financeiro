import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import requestValidate from '../middleware/requestValidate';
import userSchema from '../schemas/userShemas';
import authRequired from '../middleware/authRequired';

const router = new Router();

router.post('/', requestValidate(userSchema.post, 'body'), userControllers.store);
router.get('/', authRequired, userControllers.show);
router.get(
  '/:id',
  requestValidate(userSchema.get, 'params'),
  authRequired,
  userControllers.index
);
router.put(
  '/:id',
  requestValidate(userSchema.get, 'params'),
  requestValidate(userSchema.update, 'body'),
  authRequired,
  userControllers.update
);
router.delete(
  '/:id',
  requestValidate(userSchema.get, 'params'),
  authRequired,
  userControllers.delete
);

export default router;
