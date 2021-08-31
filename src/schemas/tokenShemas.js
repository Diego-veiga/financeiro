import Joi from 'joi';

const tokenSchemas = {
  post: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

export default tokenSchemas;
