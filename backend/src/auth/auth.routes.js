const { Router } = require('express')
const {
  loginHandler,
  registerHandler,
  forgotPassword,
  resetPassword,
  checkToken
} = require('./auth.handlers')

const auth1Routes = Router()

auth1Routes.post('/login', loginHandler)
auth1Routes.post('/register', registerHandler)
auth1Routes.post('/forgot-password', forgotPassword)
auth1Routes.post('/reset-password', resetPassword)
auth1Routes.get('/reset-password', checkToken)

module.exports = {
  auth1Routes
}
