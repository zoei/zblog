angular.module("zblog.controllers").controller "SigninCtrl", [
  "$scope"
  "AuthServ"
  ($scope, AuthServ) ->

    $scope.user = 
      email: ''
      password: ''

    $scope.signin = ->
      AuthServ.signin $scope.user, (res)->
        if res.type is true
          window.location.href = "#home"
        else
          alert res.data
]