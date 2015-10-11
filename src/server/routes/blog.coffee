express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Blog = mongoose.model 'Blog'

router.get '/', (req, res, next)->
  res.send Blog.find()

router.get '/list', (req, res, next)->
  res.send Blog.find()

router.get '/latest', (req, res, next)->
  res.send Blog.find()[0]

router.post '/save', (req, res, next)->
  blog = new Blog
    title: req.body.title
    author: req.body.author
    body: req.body.body
  blog.save (err, info)->
    console.log err, info
  res.send 'save success'

router.get '/:id', (req, res, next)->
  res.send Blog.findById req.params.id

router.get '/del/:id', (req, res, next)->
  Blog.findById(req.params.id).then (blog)->
    blog.remove()
  res.send 'del success'

module.exports = router
