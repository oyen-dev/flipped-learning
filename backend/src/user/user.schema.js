/* eslint-disable prefer-regex-literals */
const Joi = require('joi')

const getUserProfile = Joi.object({
  id: Joi.string().required()
})

module.exports = {
  getUserProfile
}
