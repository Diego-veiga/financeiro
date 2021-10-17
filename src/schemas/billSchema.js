import Joi from 'joi';

const billShema = {
  store: Joi.object().keys({
    description: Joi.string().min(3).max(50).required(),
    value: Joi.number().min(0).required(),
    total_installment: Joi.number().min(0).required(),
    creditor_id: Joi.string().required().uuid(),
    type_bill: Joi.string().valid('entry', 'output'),
    expiration_date: Joi.date().required()
  }),
  show: Joi.object().keys({
    id: Joi.string().required().uuid()
  }),
  update: Joi.object().keys({
    description: Joi.string().min(3).max(50).optional(),
    value: Joi.number().min(0).required(),
    creditor_id: Joi.string().optional().uuid(),
    type_bill: Joi.string().valid('entry', 'output'),
    expiration_date: Joi.date().optional()
  })
};

export default billShema;
