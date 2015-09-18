var Admin, Blog, express, mongoose, router;

express = require('express');

router = express.Router();

mongoose = require('mongoose');

Admin = mongoose.model('Admin');

Blog = mongoose.model('Blog');

router.get('/', function(req, res, next) {
  return res.render('login');
});

router.post('/verify', function(req, res, next) {
  return Admin.count({
    name: req.body.name,
    password: req.body.password
  }, function(err, count) {
    if (count > 0) {
      return res.redirect('/admin/console');
    } else {
      return res.render('login', {
        message: 'NG'
      });
    }
  });
});

router.get('/console', function(req, res, next) {
  return res.render('console');
});

router.get('/blogs', function(req, res, next) {
  return res.render('console/blogs', {
    blogs: Blog.find()
  });
});

router.get('/blog/delete/:id', function(req, res, next) {
  return Blog.findById(req.params.id, (function(_this) {
    return function(err, blog) {
      if (err) {
        return res.send(JSON.stringify({
          status: 'NG',
          message: 'can not find blog by ' + req.params.id
        }));
      } else {
        return blog.remove(function(err, blog) {
          if (err) {
            return res.send(JSON.stringify({
              status: 'NG',
              message: 'can not find blog by ' + req.params.id
            }));
          } else {
            return res.send(JSON.stringify({
              status: 'OK',
              message: 'delete success'
            }));
          }
        });
      }
    };
  })(this));
});

module.exports = router;
