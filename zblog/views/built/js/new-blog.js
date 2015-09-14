var submit;

submit = function() {
  var author, content, title;
  title = $('#title').val();
  author = $('#author').val();
  content = texteditor.getSource();
  return $.post('/blog/save', {
    title: title,
    author: author,
    body: content
  }, function(result) {
    return window.location.href = "/";
  });
};

$('#sub').on('click', submit);
