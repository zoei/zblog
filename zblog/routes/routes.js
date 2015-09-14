var admin, blog, routes;

routes = require('./index');

admin = require('./admin');

blog = require('./blog');

module.exports.init = function(app) {
  app.use('/', routes);
  app.use('/admin', admin);
  return app.use('/blog', blog);
};
