const {
  getUserProfile
} = require('./user.schema')

const validateGetUserProfile = (payload) => {
  const { error } = getUserProfile.validate(payload)
  if (error) throw new Error(error.message)
}

module.exports = {
  validateGetUserProfile
}
