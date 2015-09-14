var login;

login = function() {
  var username, userpwd;
  username = $('#username').val();
  userpwd = $('#userpwd').val();
  return $.post('/blog/save', {
    username: username,
    userpwd: userpwd
  }, function(result) {
    return window.location.href = "/console";
  });
};

$('#btn-login').on('click', login);
