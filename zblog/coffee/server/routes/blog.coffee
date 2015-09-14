express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Blog = mongoose.model 'Blog'

router.get '/', (req, res, next)->
  res.send Blog.find()

router.get '/new', (req, res, next)->
  res.render 'new'

router.post '/save', (req, res, next)->
  blog = new Blog
    title: req.body.title
    author: req.body.author
    body: req.body.body
  blog.save (err, info)->
    console.log err, info
  res.send 'save success'

router.get '/:id', (req, res, next)->
  res.render 'blog', blog: Blog.findById req.params.id

module.exports = router
