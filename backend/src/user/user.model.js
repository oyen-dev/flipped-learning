const { nanoid } = require('nanoid')
const { Schema, model } = require('mongoose')
const { compareSync, hashSync } = require('bcrypt')

const UserSchema = new Schema({
  // Base user fields
  _id: { type: String, required: true, default: `usr-${nanoid(16)}` },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: Number, required: true },
  dateOfBorn: { type: Date, required: true },
  placeOfBorn: { type: String, required: true },
  address: { type: String, required: true },
  picture: { type: String, required: true, default: 'https://i.pravatar.cc/300' },

  // Activation and Soft delete
  isActivated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },

  // Role
  role: { type: String, default: null },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

}, {
  methods: {
    verifyPassword (password) {
      return compareSync(password, this.password)
    }
  }
})

UserSchema.pre('save', function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  this.password = hashSync(this.password, 10)
  next()
})

const User = model('User', UserSchema)

module.exports = { User }
