login = ->
  username = $('#username').val()
  userpwd = $('#userpwd').val()
  $.post '/admin/verify', 
    name: username
    password: userpwd
  , (result)->
    window.location.href = "/console"

$('#btn-login').on 'click', login