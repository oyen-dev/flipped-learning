const { Router } = require('express')
const {
  getUserProfile
} = require('./user.handlers')

const userRoutes = Router()

userRoutes.get('/profile/:id', getUserProfile)

module.exports = {
  userRoutes
}
