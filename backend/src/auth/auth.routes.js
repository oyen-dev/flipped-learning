const { Router } = require('express')
const {
  loginHandler,
  registerHandler,
  forgotPassword
} = require('./auth.handlers')

const auth1Routes = Router()

auth1Routes.post('/login', loginHandler)
auth1Routes.post('/register', registerHandler)
auth1Routes.post('/forgot-password', forgotPassword)

module.exports = {
  auth1Routes
}
