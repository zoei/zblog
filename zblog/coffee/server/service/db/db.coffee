mongoose = require 'mongoose'
require 'express-mongoose'

require './schema/blog'

module.exports.connect = (db='zblog')->
  mongoose.connect 'mongodb://localhost/' + db