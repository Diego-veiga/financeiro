import Joi from 'joi';

const creditorShema = {
  store: Joi.object().keys({
    nome: Joi.string().min(3).max(50).required()
  }),
  show: Joi.object().keys({
    id: Joi.string().required().uuid()
  }),
  update: Joi.object().keys({
    nome: Joi.string().min(3).max(50).optional()
  })
};

export default creditorShema;
