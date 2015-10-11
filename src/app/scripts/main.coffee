angular.module("zblog", [
  "ngRoute"
  "ngResource"
  "ngAnimate"
  "zblog.utils"
  "zblog.services"
  "zblog.directives"
  "zblog.controllers"
]).config [
  "$locationProvider"
  "$routeProvider"
  ($locationProvider, $routeProvider) ->
    # $locationProvider.html5Mode true

    $routeProvider.when("/home",
      templateUrl: "partials/home.html"
      controller: "HomeCtrl"
    ).when("/blog/:id",
      templateUrl: "partials/blog.html"
      controller: "BlogCtrl"
    ).when("/newblog",
      templateUrl: "partials/newblog.html"
      controller: "NewBlogCtrl"
    ).when("/signin",
      templateUrl: "partials/signin.html"
      controller: "SigninCtrl"
    ).when("/signup",
      templateUrl: "partials/signup.html"
      controller: "SignupCtrl"
    ).otherwise redirectTo: "/home"
]

# angular.module('zblog').config [
#   '$httpProvider'
#   ($http) ->
#     $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
# ]