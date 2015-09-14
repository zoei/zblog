var login;

login = function() {
  var username, userpwd;
  username = $('#username').val();
  userpwd = $('#userpwd').val();
  return $.post('/admin/verify', {
    name: username,
    password: userpwd
  }, function(result) {
    return window.location.href = "/console";
  });
};

$('#btn-login').on('click', login);
