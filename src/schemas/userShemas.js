import Joi from 'joi';

const userSchemas = {
  post: Joi.object().keys({
    nome: Joi.string().min(3).max(50),
    sobrenome: Joi.string().min(3).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  get: Joi.object().keys({
    id: Joi.number().required()
  }),
  update: Joi.object().keys({
    nome: Joi.string().min(3).max(50).optional(),
    sobrenome: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional()
  })
};

export default userSchemas;
