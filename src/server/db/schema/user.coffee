mongoose = require 'mongoose'
Schema = mongoose.Schema

UserSchema = new Schema
  email: String
  password: String
  token: String

module.exports = mongoose.model 'User', UserSchema