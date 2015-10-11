angular.module("zblog.services").factory "AuthServ", [
  "$resource"
  "TokenServ"
  ($resource, TokenServ) ->
    transToken = (res)->
      try
        res = JSON.parse res
        if res?.type
          TokenServ.update res.token
        res
      catch error
        type: false

    $resource '/auth', {},
      signup:
        url: '/auth/signup'
        method: 'POST'
        transformResponse: transToken
      signin:
        url: '/auth/signin'
        method: 'POST'
        transformResponse: transToken
      me:
        url: '/auth/me'
        method: 'GET'
        transformResponse: transToken

]