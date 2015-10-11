mongoose = require 'mongoose'
Schema  = mongoose.Schema

AdminSchema = new Schema
  name:  String,
  password: String,
  date: 
    type: Date,
    default: Date.now

module.exports = mongoose.model 'Admin', AdminSchema