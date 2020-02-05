(function() {
  CKEDITOR.plugins.add('wk_cke_dialog_styles', {
    icons: 'wk_cke_dialog_styles',
    init: function(editor) {
      function addCSS(filename){
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');

        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';

        head.append(style);
      }

      addCSS('https://d1azc1qln24ryf.cloudfront.net/49134/WorkivaUI/style-cf.css');

      addCSS(this.path + 'css/styles.css');
    },
  });
})();
