var Blog, express, mongoose, router;

express = require('express');

router = express.Router();

mongoose = require('mongoose');

Blog = mongoose.model('Blog');

router.get('/', function(req, res, next) {
  return res.render('index', {
    blogs: Blog.find()
  });
});

module.exports = router;
