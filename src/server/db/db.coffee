mongoose = require 'mongoose'
require 'express-mongoose'

require './schema/blog'
require './schema/admin'
require './schema/user'

module.exports.connect = (db='zblog')->
  mongoose.connect 'mongodb://localhost/' + db