mongoose = require 'mongoose'
Schema  = mongoose.Schema
Promise = mongoose.Promise

adminSchema = new Schema
  name:  String,
  password: String,
  date: 
    type: Date,
    default: Date.now

module.exports = mongoose.model 'Admin', adminSchema