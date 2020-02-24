(function() {
  CKEDITOR.plugins.add('wk_cke_dialog_styles', {
    icons: 'wk_cke_dialog_styles',
    init: function(editor) {

      window.getNodeId = function() {
        if (!window.drupalSettings) {
          console.log('window.getNodeId(): drupalSettings not found');
          return;
        }

        var currentPath = window.drupalSettings.path.currentPath;
        var regex = new Regexp(/(\d+)/, 'i');
        var id = currentPath.match(regex);

        return id;
      };

      window.addLinkitAttributes = function(el) {
        var drupalPathPrefix = '';

        if (window.drupalSettings) {
          drupalPathPrefix = window.drupalSettings.path.pathPrefix;
        }


        var path = drupalPathPrefix;

        path += '/linkit/autocomplete/cln';

        el.classList.add('form-linkit-autocomplete');
        el.setAttribute(
          'data-autocomplete-path',
          path,
        );
      };

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
