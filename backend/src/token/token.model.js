const { Schema, model } = require('mongoose')

const TokenSchema = new Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  expiresIn: { type: Date, required: true }
})

const Token = model('token', TokenSchema)

module.exports = { Token }
