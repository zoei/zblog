var Admin, express, mongoose, router;

express = require('express');

router = express.Router();

mongoose = require('mongoose');

Admin = mongoose.model('Admin');

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

router.post('/console', function(req, res, next) {
  return res.render('console');
});

module.exports = router;
