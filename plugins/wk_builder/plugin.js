(function() {
  CKEDITOR.plugins.add('wk_builder', {
    icons: 'wk_builder',
    init: function(editor) {
      editor.addCommand('builder', new CKEDITOR.dialogCommand('wk_builder_dialog'));

      editor.ui.addButton('wk_builder', {
        label: 'Builder',
        command: 'builder',
        toolbar: 'insert',
//        icon: this.path + 'icons/wk_builder.png'
      });

      CKEDITOR.dialog.add('wk_builder_dialog', this.path + 'dialogs/dialog.js');
    },
  });
})();
