const pluginName = 'call-to-action';

CKEDITOR.plugins.add(pluginName, {
  icons: pluginName,
  init: function( editor ) {
    editor.addCommand('addCallToAction', new CKEDITOR.dialogCommand( 'cta-dialog', {
      allowedContent: 'p',
      requiredContent: 'p'
    }));

    editor.ui.addButton(pluginName, {
        label: 'Insert a call to action',
        command: 'addCallToAction',
        toolbar: 'insert'
    });

    CKEDITOR.dialog.add('cta-dialog', this.path + 'dialogs/call-to-action.js');

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
