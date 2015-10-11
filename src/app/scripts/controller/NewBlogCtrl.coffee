angular.module("zblog.controllers").controller "NewBlogCtrl", [
  "$scope"
  "$rootScope"
  "BlogServ"
  "$routeParams"
  ($scope, $rootScope, BlogServ, $routeParams) ->

    $scope.submit = ->
      content = texteditor.getSource()
      BlogServ.save
        title: $scope.title,
        author: $scope.author,
        body: content
      , ->
        window.location.href = "#home"
]