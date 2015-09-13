function submit() {
  var title = $('#title').val();
  var author = $('#author').val();
  var content = texteditor.getSource();
  $.post('/blog/save', {
    title: title,
    author: author,
    body: content
  }, function(result){
    console.log('result', result);
    window.location.href="/";
  });
}

$('#sub').on('click', submit);