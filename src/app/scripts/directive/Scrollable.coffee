angular.module("zblog.directives").directive 'scrollable', ->
  restrict: 'EA'
  replace: false
  transclude: true
  template: '<div ng-transclude></div>'
  link: (scope, element, attrs) ->
    scrollerId = attrs.scrollerId ? attrs.scrollable

    _scroller = new IScroll element.context,
      scrollbars: !!attrs.showScrollbar
      # 滚动条不拖动时隐藏
      fadeScrollbars: true
      # 滚动条是否可操作
      interactiveScrollbars: true
      # 滚动条是否伸缩 clip/scale
      shrinkScrollbars: 'clip'
      preventDefaultException:
        tagName: /^.*$/

    window.scrollers = scope.$scrollers = scope._scrollers ? 
      _scrollers: {},
      get: (id) ->
        scope.$scrollers._scrollers[id]
      put: (id, scroller) ->
        scope.$scrollers._scrollers[id] = scroller
        return
      refreshAll: (delay) ->
        setTimeout scroller.refresh, delay for scroller in scope.$scrollers
        return
      refresh: (id, delay, initPos = false) ->
        setTimeout ->
          scope.$scrollers._scrollers[id].refresh()
          scope.$scrollers._scrollers[id].scrollTo 0, 0, 0 if initPos

          return
        , delay ? 200
        return

    scope.$scrollers.put scrollerId, _scroller

    $(element.children()[0]).resize ->
      _scroller.refresh()
    return