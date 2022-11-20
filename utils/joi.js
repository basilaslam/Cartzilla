const joi = require('joi');
const errorFunction = require('./errorFunction');

const validation = joi.object({
  firstName: joi.string().alphanum().min(3).max(25).trim(true).required().label('first name is required'),
  lastName: joi.string().alphanum().min(3).max(25).trim(true).required().label('last name is required'),
  username: joi.string().alphanum().min(3).max(25).trim(true).required().label('username is required'),
  email: joi.string().email().trim(true).required().label('input a valid email'),
  password: joi
    .string()
    .min(8)
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/)
    .trim(true)
    .required()
    .label('input a valid password'),
  phone: joi
    .string()
    .length(10)
    .regex(/^([{2,3})?([7-9][0-9]{9})$/m)
    .required()
    .label('input a valid phone number'),
  confirm_password: joi.any().valid(joi.ref('password')).required().label('passwords are not the same'),
});

const userValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    return res.json(errorFunction(true, error.details[0].context.label));
  }

  res.json({ data: true });
};

module.exports = userValidation;
