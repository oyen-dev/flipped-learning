const { User } = require('./user.model')

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() })
}

const createUser = async (user) => {
  const newUser = new User(user)
  return await newUser.save()
}

const updatePassword = async (email, password) => {
  // Get user data
  const user = await findUserByEmail(email)

  user.password = password
  user.updatedAt = new Date()

  await user.save()
}

module.exports = {
  findUserByEmail,
  createUser,
  updatePassword
}
