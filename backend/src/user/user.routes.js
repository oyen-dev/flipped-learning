const { Router } = require('express')
const {
  getUserProfile,
  getNotActivated
} = require('./user.handlers')

const userRoutes = Router()

userRoutes.get('/profile/:id', getUserProfile)
userRoutes.get('/not-activated', getNotActivated)

module.exports = {
  userRoutes
}
