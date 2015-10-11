angular.module("zblog.utils").factory "Extends", [->
  extend: (Child, Parent) ->
    F = ->

    F:: = Parent::
    Child:: = new F()
    Child::constructor = Child
    Child.uber = Parent::
    return

  __default__: (obj, defaults) ->
    for p of defaults
      obj[p] = defaults[p]  unless p of obj
    obj
]