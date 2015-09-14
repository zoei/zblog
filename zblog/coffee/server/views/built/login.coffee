login = ->
  username = $('#username').val()
  userpwd = $('#userpwd').val()
  $.post '/blog/save', 
    username: username
    userpwd: userpwd
  , (result)->
    window.location.href = "/console"

$('#btn-login').on 'click', login