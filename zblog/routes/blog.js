var Blog, express, mongoose, router;

express = require('express');

router = express.Router();

mongoose = require('mongoose');

Blog = mongoose.model('Blog');

router.get('/', function(req, res, next) {
  return res.send(Blog.find());
});

router.get('/new', function(req, res, next) {
  return res.render('new');
});

router.post('/save', function(req, res, next) {
  var blog;
  console.log('params', req.body);
  blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  });
  blog.save(function(err, info) {
    return console.log(err, info);
  });
  return res.send('save success');
});

router.get('/:id', function(req, res, next) {
  return res.render('blog', {
    blog: Blog.findById(req.params.id)
  });
});

module.exports = router;
