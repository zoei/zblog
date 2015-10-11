mongoose = require 'mongoose'
require 'express-mongoose'

require './schema/blog'
require './schema/admin'

module.exports.connect = (db='zblog')->
  mongoose.connect 'mongodb://localhost/' + db