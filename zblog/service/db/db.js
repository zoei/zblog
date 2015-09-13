var mongoose;

mongoose = require('mongoose');

require('express-mongoose');

require('./schema/blog');

module.exports.connect = function(db) {
  if (db == null) {
    db = 'zblog';
  }
  return mongoose.connect('mongodb://localhost/' + db);
};
