routes = require './index'
users = require './users'
blog = require './blog'

module.exports.init = (app)->
  app.use '/', routes
  app.use '/users', users
  app.use '/blog', blog