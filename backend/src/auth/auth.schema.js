/* eslint-disable prefer-regex-literals */
const Joi = require('joi')

const RegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  gender: Joi.number().required(),
  dateOfBorn: Joi.date().required(),
  placeOfBorn: Joi.string().required(),
  address: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password')
})

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  remember: Joi.boolean().required()
})

const ForgotSchema = Joi.object({
  email: Joi.string().email().required()
})

const ResetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password')
})

const checkToken = Joi.object({
  token: Joi.string().required()
})

module.exports = {
  RegisterSchema,
  LoginSchema,
  ForgotSchema,
  ResetPasswordSchema,
  checkToken
}
