angular.module("zblog.controllers").controller "AppCtrl", [
  "$scope"
  '$rootScope'
  '$route'
  '$location'
  ($scope, $rootScope, $route, $location) ->

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
      $rootScope.tokenInfo?.access_token

    $scope.hasJoined = (act_id)->
      return false  unless $rootScope.currentUser
      return false  if not $rootScope.userActivities or not $rootScope.userActivities.length
      i = 0
      while i < $rootScope.userActivities.length
        activity = $rootScope.userActivities[i]
        return true if act_id is activity.id
        i++
      false

]