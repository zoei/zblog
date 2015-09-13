window.texteditor = $('#text-editor').xheditor({
  tools: 'full',
  skin: 'default',
  showBlocktag: true,
  internalScript: false,
  internalStyle: false,
  width: '100%',
  height: 200,
  // loadCSS: 'http://xheditor.com/test.css',
  fullscreen: false,
  sourceMode:false,
  forcePtag: true,
  upImgUrl:"upload.php",
  upImgExt:"jpg,jpeg,gif,png"
});