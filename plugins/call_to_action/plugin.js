/**
 * @file
 * Call to action plugin.
 */

(function () {

  CKEDITOR.plugins.add('call_to_action', {
    requires: 'dialog',
    icons: 'call_to_action',
    init: function(editor) {
      editor.addCommand('addCallToAction', new CKEDITOR.dialogCommand('cta-dialog', {
        allowedContent: 'p, div, button',
      }));

      editor.ui.addButton('call_to_action', {
          label: 'Insert a call to action',
          command: 'addCallToAction',
          toolbar: 'insert'
      });

      CKEDITOR.dialog.add('cta-dialog', this.path + 'dialogs/call_to_action.js');

      function addCSS(filename){
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');

        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';

        head.append(style);
      }

      addCSS(this.path + 'css/styles.css');
    },
  });
})();
