mongoose = require 'mongoose'
Schema  = mongoose.Schema
Promise = mongoose.Promise

blogSchema = new Schema
  title:  String,
  author: String,
  body:   String,
  comments: [
    body: String,
    date: Date
  ],
  date: 
    type: Date,
    default: Date.now
  hidden: Boolean,
  meta:
    votes: Number,
    favs:  Number

module.exports = mongoose.model 'Blog', blogSchema