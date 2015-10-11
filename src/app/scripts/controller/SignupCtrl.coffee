angular.module("zblog.controllers").controller "SignupCtrl", [
  "$scope"
  "AuthServ"
  ($scope, AuthServ) ->

    $scope.user = 
      email: ''
      password: ''

    $scope.signup = ->
      AuthServ.signup $scope.user, (res)->
        if res.type is true
          window.location.href = "#home"
        else
          alert res.data
]