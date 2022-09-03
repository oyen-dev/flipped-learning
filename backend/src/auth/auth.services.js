const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret'
  const payload = jwt.sign(
    {
      type: 'ACCESS_TOKEN'
    },
    JWT_SECRET,
    {
      expiresIn: '24h',
      jwtid: user._id.toString(),
      subject: user.email
    }
  )

  return payload
}

module.exports = {
  generateAccessToken
}
