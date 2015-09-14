submit = ->
  title = $('#title').val()
  author = $('#author').val()
  content = texteditor.getSource()
  $.post '/blog/save', 
    title: title,
    author: author,
    body: content
  , (result)->
    window.location.href = "/"

$('#sub').on 'click', submit