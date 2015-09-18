express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Admin = mongoose.model 'Admin'
Blog = mongoose.model 'Blog'

router.get '/', (req, res, next)->
  res.render 'login'

router.post '/verify', (req, res, next)->
  Admin.count
    name: req.body.name
    password: req.body.password
  , (err, count)->
    if count > 0
      res.redirect '/admin/console'
    else
      res.render 'login', {message: 'NG'}

router.get '/console', (req, res, next)->
  res.render 'console'

router.get '/blogs', (req, res, next)->
  res.render 'console/blogs',
    blogs: Blog.find()

router.get '/blog/delete/:id', (req, res, next)->
  Blog.findById req.params.id, (err, blog)=>
    if err
      res.send JSON.stringify
        status: 'NG'
        message: 'can not find blog by ' + req.params.id
    else 
      blog.remove (err, blog)->
        if err
          res.send JSON.stringify
            status: 'NG'
            message: 'can not find blog by ' + req.params.id
        else 
          res.send JSON.stringify
            status: 'OK'
            message: 'delete success'

module.exports = router