angular.module("zblog.controllers").controller "BlogCtrl", [
  "$scope"
  "$rootScope"
  "BlogServ"
  "$routeParams"
  ($scope, $rootScope, BlogServ, $routeParams) ->

    $scope.blog = BlogServ.get blogid: $routeParams.id
]