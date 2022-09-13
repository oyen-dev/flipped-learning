// Services
const { generateAccessToken } = require('./auth.services')
const { updatePassword } = require('../user/user.services')
const { generateToken, getTokenByEmail, getTokenByToken, deleteTokenByToken } = require('../token/token.services')

// Validations
const { validateRegister, validateLogin, validateForgot, validateReset } = require('./auth.validation')

// Utilities
const { AppLogger } = require('../utils/logger')
const { findUserByEmail, createUser } = require('../user/user.services')
const { successResponse, badResponse } = require('../utils/responses')
const { sendEmail } = require('../utils/mail')

// Errors
const { invariantError } = require('../errors')

const loginHandler = async (req, res) => {
  const payload = req.body
  const { email, password } = payload

  try {
    validateLogin(payload)

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

    const message = {
      name: user.fullName,
      email
    }

    await sendEmail(message, 'Pendaftaran Berhasil', 'register')

    return res.status(200).json(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code || 400)
    return res.status(error.code || 400).json(response)
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

    const response = badResponse(message, error.code || 400)
    return res.status(error.code || 400).json(response)
  }
}

const forgotPassword = async (req, res) => {
  const payload = req.body
  const { email } = payload

  try {
    // Validate payload
    validateForgot(payload)

    // Get user data
    const user = await findUserByEmail(email)
    if (!user) throw invariantError(404, 'Cannot find account with this email.')

    // Check if user have token
    const currentToken = await getTokenByEmail(email)

    // Use current token or generate new token with duration for 24 hours
    let token = ''
    if (currentToken) token = currentToken
    else token = await generateToken(email)

    // Todo Send email for reseting password

    // Response payload
    const response = successResponse('Request reset password success.', {
      token: token.token
    })
    return res.status(200).send(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code || 400)
    return res.status(error.code || 400).json(response)
  }
}

const resetPassword = async (req, res) => {
  const token = req.query.token
  const payload = req.body

  try {
    // Validate payload
    validateReset(payload)

    // Destructure
    const { password } = payload

    // Query token
    const userToken = await getTokenByToken(token)

    if (!userToken) throw invariantError(404, 'Invalid token')

    // Update account password based on email
    await updatePassword(userToken.email, password)

    // Delete token
    await deleteTokenByToken(token)

    // Todo send email notification

    // Response payload
    const response = successResponse('Update password success')
    return res.status(200).send(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code || 400)
    return res.status(error.code || 400).json(response)
  }
}

module.exports = {
  loginHandler,
  registerHandler,
  forgotPassword,
  resetPassword
}
