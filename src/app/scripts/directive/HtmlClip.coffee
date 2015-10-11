angular.module("zblog.directives").directive "htmlClip", ["$parse", ($parse)->
  restrict: 'EA'
  scope: true
  template:''
  link: (scope, element, attrs) ->
    fn = $parse attrs['text']
    scope.$watch attrs['text'], ->
      element.html fn(scope)
]