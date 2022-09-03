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
  confirm_password: Joi.ref('password')
})

module.exports = {
  RegisterSchema
}
