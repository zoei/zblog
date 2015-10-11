router = require('express').Router()
jwt = require 'jsonwebtoken'
User = require('mongoose').model 'User'

JWT_SECRET = 'zoei'

router.post '/signup', (req, res)->
  User.findOne email: req.body.email, password: req.body.password, (err, user)->
    if err
      res.json
        type: false
        data: "Error occured: " + err
    else
      if user
        res.json
          type: true
          data: user
          token: user.token
      else
        res.json
          type: false
          data: "Incorrect email/password"

router.post '/signin', (req, res)->
  User.findOne email: req.body.email, password: req.body.password, (err, user)->
    if err
      res.json
        type: false
        data: "Error occured: " + err
    else
      if user
        res.json
          type: false
          data: "User already exists!"
      else
      userModel = new User
      userModel.email = req.body.email
      userModel.password = req.body.password
      userModel.save (err, user)->
        user.token = jwt.sign user, JWT_SECRET
        user.save (err, user1)->
          res.json
            type: true
            data: user1
            token: user1.token

router.get '/me', require('../service/ensurer'), (req, res)->
  User.findOne token: req.token, (err, user)->
    if err
      res.json
        type: false
        data: "Error occured: " + err
    else
      res.json
        type: true
        data: user
        token: user.token

module.exports = router