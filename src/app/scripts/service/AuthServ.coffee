angular.module("zblog.services").factory "AuthServ", [
  "$resource"
  ($resource) ->
    $resource "http://happymuslim.net/zblog/api/token.php", {_id: 1, res: "json"},
      getToken:
        method: 'POST'
]