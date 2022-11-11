const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).regex('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$').required(),
  confirm: Joi.ref('password'),
});
