ensureAuthorized = (req, res, next)->
  bearerHeader = req.headers["authorization"]
  if typeof bearerHeader isnt 'undefined'
    bearer = bearerHeader.split " "
    bearerToken = bearer[1]
    req.token = bearerToken
    next()
  else
    res.send 403

module.exports = ensureAuthorized