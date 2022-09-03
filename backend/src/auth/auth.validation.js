const { RegisterSchema, LoginSchema } = require('./auth.schema')

const validateRegister = (payload) => {
  const { error } = RegisterSchema.validate(payload)

  if (error) throw new Error(error.message)
}

const validateLogin = (payload) => {
  const { error } = LoginSchema.validate(payload)

  if (error) throw new Error(error.message)
}

module.exports = {
  validateRegister,
  validateLogin
}
