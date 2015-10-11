angular.module("zblog.services").factory "BlogServ", [
  "$resource"
  ($resource) ->
    $resource "blog/:blogid", {blogid: 'list'},
      query:
        params: 
          blogid: 'list'
        isArray: true
      save:
        method: "POST"
        params: 
          blogid: 'save'
      remove:
        url: "blog/del/:blogid"
]