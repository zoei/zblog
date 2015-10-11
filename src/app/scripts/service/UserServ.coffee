angular.module("zblog.services").factory "UserServ", [
  "$resource"
  'Formator'
  '$rootScope'
  ($resource, Formator, $rootScope) ->
    $resource "http://happymuslim.net/zblog/api/user.php", {_id: 1, res: "json"},
      getUser:
        method: 'POST'
        headers:
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        params:
          api: 'user'
        transformRequest: (data) ->
          if angular.isObject(data) && String(data) != '[object File]' then Formator.formatObj2Params(data) else data
        transformResponse: (result) ->
          return angular.fromJson(result)?.data
      getUsers:
        method: 'POST'
        headers:
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        params:
          api: 'users'
        isArray: true
        transformRequest: (data) ->
          if angular.isObject(data) && String(data) != '[object File]' then Formator.formatObj2Params(data) else data
        transformResponse: (result) ->
          return angular.fromJson(result)?.data
]