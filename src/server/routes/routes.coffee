blog = require './blog'

module.exports.init = (app)->
  app.use '/blog', blog