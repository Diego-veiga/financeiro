import { Router } from 'express';
import creditorController from '../controllers/creditorController';
import authRequired from '../middleware/authRequired';
import requestValidate from '../middleware/requestValidate';
import creditorSchema from '../schemas/creditorShema';

const router = new Router();

router.post(
  '/',
  requestValidate(creditorSchema.store, 'body'),
  authRequired,
  creditorController.store
);
router.get('/', authRequired, creditorController.index);
router.get(
  '/:id',
  requestValidate(creditorSchema.show, 'params'),
  authRequired,
  creditorController.show
);
router.put(
  '/:id',
  requestValidate(creditorSchema.show, 'params'),
  requestValidate(creditorSchema.update, 'body'),
  authRequired,
  creditorController.update
);
router.delete(
  '/:id',
  requestValidate(creditorSchema.show, 'params'),

  authRequired,
  creditorController.delete
);

export default router;
