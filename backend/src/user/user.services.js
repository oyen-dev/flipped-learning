const { User } = require('./user.model')
const { invariantError } = require('../errors')

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() })
}

const getUserById = async (id) => {
  return await User.findById(id)
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

const getProfile = async (id) => {
  const user = await getUserById(id)

  if (!user) throw invariantError(404, 'User not found')

  return {
    id: user._id,
    name: user.fullName,
    email: user.email,
    gender: user.gender,
    dob: user.dateOfBorn,
    pob: user.placeOfBorn,
    address: user.address,
    picture: user.picture,
    isActivated: user.isActivated
  }
}

module.exports = {
  findUserByEmail,
  getUserById,
  createUser,
  updatePassword,
  getProfile
}
