const { AppLogger } = require('../utils/logger')
const { validateRegister, validateLogin } = require('./auth.validation')
const { generateAccessToken } = require('./auth.services')
const { findUserByEmail, createUser } = require('../user/user.services')

const loginHandler = async (req, res) => {
  const payload = req.body

  try {
    validateLogin(payload)

    const { email, password } = payload

    const user = await findUserByEmail(email)
    if (!user) {
      res.status(401).send({ messages: 'Unauthorized' })
      return
    }
    if (!user.verifyPassword(password)) {
      res.status(401).send({ messages: 'Unauthorized' })
      return
    }
    const accessToken = generateAccessToken(user)
    res.send({
      accessToken,
      type: 'Bearer',
      expiresIn: 86400
    })
  } catch (error) {
    res.status(500).send({ messages: `${error}` })
  }
}

const registerHandler = async (req, res) => {
  const payload = req.body

  try {
    // Validate payload
    validateRegister(payload)

    // Check if user already exists
    if (await findUserByEmail(payload.email)) {
      return res.status(400).send({ messages: 'User already exists' })
    }

    // Save user
    await createUser(payload)

    AppLogger.writeLog('Register success:', payload.email, false)
    res.status(200).send({ messages: 'Register success' })
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const messages = error.message.replace(/['"]+/g, '')

    return res.status(400).send({
      messages
    })
  }
}

module.exports = {
  loginHandler,
  registerHandler
}
