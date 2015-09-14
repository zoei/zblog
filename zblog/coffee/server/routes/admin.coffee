express = require 'express'
router = express.Router()

mongoose = require 'mongoose'
Admin = mongoose.model 'Admin'

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

router.post '/console', (req, res, next)->
  res.render 'console'


module.exports = router
