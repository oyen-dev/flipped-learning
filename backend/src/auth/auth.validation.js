const {
  RegisterSchema,
  LoginSchema,
  ForgotSchema,
  ResetPasswordSchema,
  checkToken
} = require('./auth.schema')

const validateRegister = (payload) => {
  const { error } = RegisterSchema.validate(payload)
  if (error) throw new Error(error.message)
}

const validateLogin = (payload) => {
  const { error } = LoginSchema.validate(payload)
  if (error) throw new Error(error.message)
}

const validateForgot = payload => {
  const { error } = ForgotSchema.validate(payload)
  if (error) throw new Error(error.message)
}

const validateReset = payload => {
  const { error } = ResetPasswordSchema.validate(payload)
  if (error) throw new Error(error.message)
}

const validateToken = payload => {
  const { error } = checkToken.validate(payload)
  if (error) throw new Error(error.message)
}

module.exports = {
  validateRegister,
  validateLogin,
  validateForgot,
  validateReset,
  validateToken
}
