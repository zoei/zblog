angular.module("zblog.controllers").controller "NewBlogCtrl", [
  "$scope"
  "$rootScope"
  "BlogServ"
  "$routeParams"
  ($scope, $rootScope, BlogServ, $routeParams) ->

    $scope.submit = ->
      title = document.querySelector('#title').value
      author = document.querySelector('#author').value
      content = texteditor.getSource()
      BlogServ.save
        title: title,
        author: author,
        body: content
      , ->
        window.location.href = "#home"
]