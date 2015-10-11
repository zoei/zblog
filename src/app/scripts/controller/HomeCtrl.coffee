angular.module("zblog.controllers").controller "HomeCtrl", [
  "$scope"
  "$rootScope"
  "BlogServ"
  ($scope, $rootScope, BlogServ) ->

    $scope.selectBlog = (blog) ->
      window.location.hash = "#/blog/" + blog.id
      return

    $scope.getRecentBlogs = ->
      $scope.blogs = BlogServ.getRecentBlogs count: 20
      return

    $scope.blogs = BlogServ.query()

    $scope.del = (id)->
      BlogServ.remove blogid: id, ->
        window.location.href = "#home"
]