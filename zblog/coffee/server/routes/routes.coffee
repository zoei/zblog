routes = require './index'
admin = require './admin'
blog = require './blog'

module.exports.init = (app)->
  app.use '/', routes
  app.use '/admin', admin
  app.use '/blog', blog