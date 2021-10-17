import { Router } from 'express';
import billSchema from '../schemas/billSchema';
import authRequired from '../middleware/authRequired';
import billController from '../controllers/billController';
import requestValidate from '../middleware/requestValidate';

const router = new Router();

router.post('/', requestValidate(billSchema.store, 'body'), authRequired, billController.store);
router.get('/', authRequired, billController.index);
router.get(
  '/:id',
  requestValidate(billSchema.show, 'params'),
  authRequired,
  billController.show
);
router.put(
  '/:id',
  requestValidate(billSchema.show, 'params'),
  requestValidate(billSchema.update, 'body'),
  authRequired,
  billController.update
);
router.delete(
  '/:id',
  requestValidate(billSchema.show, 'params'),
  authRequired,
  billController.delete
);

export default router;
