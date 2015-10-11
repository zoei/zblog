angular.module("zblog.services").factory "JSONPProxy", [
  "$resource"
  ($resource) ->
    $resource("./php/HTTPProxy.php", {},
      request:
        method: "GET"
        isArray: false
        params: {}
    )
]