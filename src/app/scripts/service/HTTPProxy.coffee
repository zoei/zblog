angular.module("zblog.services").factory "HTTPProxy", [
  "$resource"
  "Extends"
  ($resource, Extends) ->
    return init: (config) ->
      url = undefined
      config = config or {}
      switch config.way
        when "jsonp"
          Extends.__default__ config,
            method: "JSONP"
            params:
              callback: "JSON_CALLBACK"

          url = "http://happymuslim.net/jsonpproxy.php"
        when "ajax"
          Extends.__default__ config,
            method: "GET"

          url = config.uri
        when "server"
        else
          Extends.__default__ config,
            method: "GET"

          url = "./php/jsonpproxy.php"
      $resource(url, {},
        request: config
      )
]