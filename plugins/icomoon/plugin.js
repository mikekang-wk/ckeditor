/**
 * @file
 * Icomoon plugin.
 */

(function ($, Drupal, CKEDITOR) {

  CKEDITOR.plugins.add('icomoon', {
    requires: 'dialog',
    icons: 'icomoon',
    init: function(editor) {
      editor.addCommand('addIcon', new CKEDITOR.dialogCommand('icomoon-dialog', {
        allowedContent: 'p',
        requiredContent: 'p'
      }));

      editor.ui.addButton && editor.ui.addButton('icomoon', {
        label: 'Insert an icon',
        command: 'addIcon',
        toolbar: 'insert'
      });

      CKEDITOR.dialog.add('icomoon-dialog', this.path + 'dialogs/icomoon.js' );

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

      var icomoonEndpoint = 'https://i.icomoon.io/public/a5dc34c96c/WorkivaUI/selection.json';
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response = JSON.parse(xhr.responseText);

          editor.icomoon = response.icons;
        } else {
          console.log('XHR request failed');
        }
      };

      xhr.open('GET', icomoonEndpoint);
      xhr.send();
    },
  });

})(jQuery, Drupal, CKEDITOR);
