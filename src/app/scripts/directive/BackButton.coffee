angular.module("zblog.directives").directive "backButton", ['$window', ($window)->
  restrict: 'EA'
  scope: true
  template:'<a class="icon icon-left-nav pull-left"></a>'
  replace: true
  link: (scope, element, attrs) ->
    element.bind 'click', ->
      $window.history.back()
]