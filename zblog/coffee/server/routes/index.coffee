express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Blog = mongoose.model 'Blog'

# GET home page. 
router.get '/', (req, res, next)->
  res.render 'index', 
    blogs: Blog.find()

module.exports = router

