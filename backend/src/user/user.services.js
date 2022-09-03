const { User } = require('./user.model')

const checkUserIsExist = async (email) => {
  return await User.findOne({ email: email.toLowerCase() })
}

const createUser = async (user) => {
  const newUser = new User(user)
  return await newUser.save()
}

module.exports = {
  checkUserIsExist,
  createUser
}
