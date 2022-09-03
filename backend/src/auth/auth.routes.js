const { Router } = require('express')
const { loginHandler, registerHandler } = require('./auth.handlers')

const auth1Routes = Router()

auth1Routes.post('/login', loginHandler)
auth1Routes.post('/register', registerHandler)

module.exports = {
  auth1Routes
}
