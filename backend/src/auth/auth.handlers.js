const { AppLogger } = require('../utils/logger')
const { validateRegister, validateLogin } = require('./auth.validation')
const { generateAccessToken } = require('./auth.services')
const { findUserByEmail, createUser } = require('../user/user.services')
const { successResponse, badResponse } = require('../utils/responses')
const { invariantError } = require('../errors')

const loginHandler = async (req, res) => {
  const payload = req.body

  try {
    validateLogin(payload)

    const { email, password } = payload

    const user = await findUserByEmail(email)
    if (!user) throw invariantError(401, 'Unauthorized')
    if (!user.verifyPassword(password)) throw invariantError(401, 'Unauthorized')

    const accessToken = generateAccessToken(user)

    // Response payload
    const response = successResponse('Login success.',
      {
        accessToken,
        type: 'Bearer',
        expiresIn: 86400
      }
    )

    return res.status(200).json(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code)
    return res.status(error.code).json(response)
  }
}

const registerHandler = async (req, res) => {
  const payload = req.body

  try {
    // Validate payload
    validateRegister(payload)

    // Check if user already exists
    if (await findUserByEmail(payload.email)) throw invariantError(409, 'User already exists.')

    // Save user
    await createUser(payload)

    AppLogger.writeLog('Register success:', payload.email, false)

    // Response payload
    const response = successResponse('Register success')
    return res.status(200).send(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code)
    return res.status(error.code).json(response)
  }
}

module.exports = {
  loginHandler,
  registerHandler
}
