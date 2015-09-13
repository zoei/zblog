var blog, routes, users;

routes = require('./index');

users = require('./users');

blog = require('./blog');

module.exports.init = function(app) {
  app.use('/', routes);
  app.use('/users', users);
  return app.use('/blog', blog);
};
