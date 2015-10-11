angular.module("zblog.directives").directive "xheditor", ['$http', ($http)->
  restrict: 'EA'
  scope: true
  template:'<textarea id="text-editor"></textarea>'
  replace: true
  link: (scope, element, attrs) ->
    window.texteditor = element.xheditor
      tools: 'full',
      skin: 'default',
      showBlocktag: true,
      internalScript: false,
      internalStyle: false,
      width: '100%',
      height: 200,
      fullscreen: false,
      sourceMode: false,
      forcePtag: true,
      upImgUrl: "upload.php",
      upImgExt: "jpg,jpeg,gif,png"
]