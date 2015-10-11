angular.module("zblog.services").factory "TokenServ", [
  "$http"
  ($http) ->
    get: ->
      $http.defaults.headers.common['Authorization']
    update: (token)->
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + token
]