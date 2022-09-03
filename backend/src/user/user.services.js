const { User } = require('./user.model')

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() })
}

const createUser = async (user) => {
  const newUser = new User(user)
  return await newUser.save()
}

module.exports = {
  findUserByEmail,
  createUser
}
