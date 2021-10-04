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

export default router;
