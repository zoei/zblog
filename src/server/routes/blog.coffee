router = require('express').Router()
Blog = require('mongoose').model 'Blog'

router.get '/', (req, res, next)->
  res.send Blog.find()

# get all blogs
router.get '/list', (req, res, next)->
  res.send Blog.find()

# insert blog
router.post '/save', (req, res, next)->
  blog = new Blog
    title: req.body.title
    author: req.body.author
    body: req.body.body
  blog.save (err, info)->
    if err then console.log err
  res.send 'save success'

# delete blog
router.get '/del/:id', (req, res, next)->
  Blog.findById(req.params.id).then (blog)->
    blog.remove()
  res.send 'del success'

# get single blog
router.get '/:id', (req, res, next)->
  res.send Blog.findById req.params.id

module.exports = router
