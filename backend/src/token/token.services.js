const { Token } = require('./token.model')
const crypto = require('crypto')

const generateToken = async (email) => {
  // Generate random string
  const secureToken = crypto.randomBytes(48).toString('hex')

  // Setting token expiration time by one day
  const expire = new Date()
  expire.setDate(expire.getDate() + 1)

  // Create document object
  const token = new Token({
    email,
    token: secureToken,
    expiresIn: expire.toISOString()
  })

  console.log(token)

  // Save token
  await token.save()

  console.log(token)

  // Return result
  if (token) return token
  return false
}

const getTokenByToken = async (tokens) => {
  // Get Token document using token
  const token = await Token.findOne({ token: tokens })

  // Return result
  if (token) return token
  return false
}

const getTokenByEmail = async (email) => {
  // Get Token document using email
  const token = await Token.findOne({ email })

  // Return result
  if (token) return token
  return false
}

const deleteTokenByToken = async (tokens) => {
  // Find token then delete it
  await Token.findOneAndDelete({ token: tokens })
}

module.exports = {
  generateToken,
  getTokenByToken,
  getTokenByEmail,
  deleteTokenByToken
}
