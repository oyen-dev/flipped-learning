const { AppLogger } = require('../utils/logger')
const { validateRegister } = require('./auth.validation')
const { checkUserIsExist, createUser } = require('../user/user.services')

const loginHandler = (req, res) => {
  const payload = req.body

  try {
    AppLogger.info('Login request', payload)
    res.status(200).send({ message: 'Login request' })
  } catch (error) {
    AppLogger.error('Login request', error)
    res.status(500).send({ message: 'Login request' })
  }
}

const registerHandler = async (req, res) => {
  const payload = req.body

  try {
    // Validate payload
    validateRegister(payload)

    // Check if user already exists
    if (await checkUserIsExist(payload.email)) {
      return res.status(400).send({ message: 'User already exists' })
    }

    // Save user
    await createUser(payload)

    AppLogger.writeLog('Register success', payload)
    res.status(200).send({ message: 'Register success' })
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
