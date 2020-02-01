(function() {
  const wk_plugin_name = 'wk_builder';

  CKEDITOR.plugins.add(wk_plugin_name, {
    requires: 'widget',
    icons: wk_plugin_name,
    init: function(editor) {
      CKEDITOR.dialog.add(wk_plugin_name, this.path + 'dialogs/dialog.js');

      editor.populateLayoutOptions = function(obj) {
        var arr = [
          [
            '<img alt="a-a-a" src="" />',
            'a-a-a',
          ],
          [
            '<img alt="a-b" src="" />',
            'a-b',
          ],
          [
            '<img alt="b-a" src="" />',
            'b-a',
          ],
        ];
        return arr;
      }

      editor.widgets.add(wk_plugin_name, {
        button: 'Add Grid/Columns',
        data: function() {
          const el = this.element;
        },
        dialog: wk_plugin_name,
        init: function() {
          const el = this.element;
        },
        template: '<div class="wk-cke-pagebuilder"></div>',
        upcast: function(element) {
          if (
            element.name !== 'div' ||
            !element.hasClass('wk-cke-pagebuilder')
          ) {
            return false;
          }
          return false;
        },
      });
    },
  });
})();
