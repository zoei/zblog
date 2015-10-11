blog = require './blog'
auth = require './auth'

module.exports.init = (app)->
  app.use '/blog', blog
  app.use '/auth', auth