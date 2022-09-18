const { Router } = require('express')
const {
  loginHandler,
  registerHandler,
  forgotPassword,
  resetPassword,
  checkToken
} = require('./auth.handlers')

const authRoutes = Router()

authRoutes.post('/login', loginHandler)
authRoutes.post('/register', registerHandler)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post('/reset-password', resetPassword)
authRoutes.get('/reset-password', checkToken)

module.exports = {
  authRoutes
}
