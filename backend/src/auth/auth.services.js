const jwt = require('jsonwebtoken')

const generateAccessToken = (user, remember) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret'
  const payload = jwt.sign(
    {
      type: 'ACCESS_TOKEN'
    },
    JWT_SECRET,
    {
      expiresIn: remember ? '168' : '24h',
      jwtid: user._id.toString(),
      subject: user.email
    }
  )

  return payload
}

module.exports = {
  generateAccessToken
}
