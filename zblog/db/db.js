var mongoose;

mongoose = require('mongoose');

require('express-mongoose');

require('./schema/blog');

require('./schema/admin');

module.exports.connect = function(db) {
  if (db == null) {
    db = 'zblog';
  }
  return mongoose.connect('mongodb://localhost/' + db);
};
