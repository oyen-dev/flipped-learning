const { RegisterSchema } = require('./auth.schema')

const validateRegister = (payload) => {
  const { error } = RegisterSchema.validate(payload)

  if (error) throw new Error(error.message)
}

module.exports = {
  validateRegister
}
