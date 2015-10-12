angular.module("zblog.directives").directive "zHeader", [->
  restrict: 'EA'
  template: '<div class="container-fluid header">
  <a href="#/signup" class="pull-right" ng-hide="isAuthorized()">Signup</a>
  <a href="#/newblog" class="pull-right" ng-show="isAuthorized()">Write Blog</a>
  <h1><a href="#/home">酌酒花间</a></h1>
  <h5>即行即景，</h5>
  <h5>且行且思</h5>
</div>'
  replace: true
]