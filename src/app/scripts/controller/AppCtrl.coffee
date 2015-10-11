angular.module("zblog.controllers").controller "AppCtrl", [
  "$scope"
  '$rootScope'
  'TokenServ'
  ($scope, $rootScope, TokenServ) ->

    $scope.$on '$locationChangeStart', ->
    $scope.$on '$viewContentLoaded', ->
      /^\/(\w*)/.test $scope.currentRoute.originalPath
      currentViewName = RegExp.$1

      preView = $ '[ng-view][id]'
      preView.attr 'switched-view', currentViewName

      currentView = $ '[ng-view]:not([id])'
      currentView.attr 'id', currentViewName
      currentView.attr 'switched-view', preView.attr('id')

    $scope.$on '$routeChangeSuccess', (e, currentRoute, preRoute)->
      $scope.preRoute = preRoute
      $scope.currentRoute = currentRoute

    $scope.isAuthorized = ->
      TokenServ.get()

]