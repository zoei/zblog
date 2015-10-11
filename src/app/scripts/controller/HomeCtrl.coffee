angular.module("zblog.controllers").controller "HomeCtrl", [
  "$scope"
  "BlogServ"
  "AuthServ"
  ($scope, BlogServ, AuthServ) ->

    $scope.blogs = BlogServ.query()

    $scope.del = (id)->
      BlogServ.remove blogid: id, ->
        window.location.href = "#home"
]