// Services
const { getProfile, getNotActivatedYet } = require('./user.services')

// Validations
const {
  validateGetUserProfile
} = require('./user.validation')

// Utilities
const { successResponse, badResponse } = require('../utils/responses')
const { validateAccessToken } = require('../auth/auth.services')

// Errors
const { invariantError } = require('../errors')

const getUserProfile = async (req, res) => {
  const payload = req.params
  const token = req.headers.authorization

  try {
    // Check and validate authorization token
    if (!token) throw invariantError(401, 'Token is required')

    // Validate token
    if (!validateAccessToken(token)) invariantError(401, 'Invalid token')

    // Validate payload
    validateGetUserProfile(payload)

    // Get user profile
    const user = await getProfile(payload.id)

    // Response payload
    const response = successResponse('Get user profile success.', { user })

    return res.status(200).json(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code || 400)
    return res.status(error.code || 400).json(response)
  }
}

const getNotActivated = async (req, res) => {
  const token = req.headers.authorization

  try {
    // Check and validate authorization token
    if (!token) throw invariantError(401, 'Token is required')

    // Validate token
    if (!validateAccessToken(token)) invariantError(401, 'Invalid token')

    // Get not activated yet account
    const users = await getNotActivatedYet()

    // Response payload
    const response = successResponse('Get not activated yet account success.', { users })

    return res.status(200).json(response)
  } catch (error) {
    // Beautify error message to remove double quote from joi validation
    const message = error.message.replace(/['"]+/g, '')

    const response = badResponse(message, error.code || 400)
    return res.status(error.code || 400).json(response)
  }
}

module.exports = {
  getUserProfile,
  getNotActivated
}
