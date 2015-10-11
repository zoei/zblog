angular.module("zblog.utils").factory "Formator", [->
  encodeJsonpRequest: (params) ->
    base64Encoder = new Base64()
    paramsb64 = JSON.stringify(params)
    paramsb64 = base64Encoder.encode(paramsb64)
    _: paramsb64

  formatUrlParams: (obj) ->
    (k+'='+v for k, v of obj).join '&'

  formatObj2Params: (obj) ->
    _self = arguments.callee
    query = ''

    for name, value of obj
        
      if value instanceof Array
        for subValue, i in value
          fullSubName = name + '[' + i + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += _self(innerObj) + '&'
      else if value instanceof Object
        for subValue, subName in value
          fullSubName = name + '[' + subName + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += _self(innerObj) + '&'
      else if value?
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
    return query?.substr 0, query.length - 1
]