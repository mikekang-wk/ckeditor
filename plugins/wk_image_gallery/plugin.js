(function() {
  CKEDITOR.plugins.add('wk_image_gallery', {
    requires: 'widget',
    icons: 'wk_image_gallery',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_image_gallery', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_image_gallery', {
        button: 'Image Gallery',
        editables: {
          content: {
            selector: '.wk-cke-image-gallery',
          }
        },
        requiredContent: '(wk-cke-image-gallery)',
        template: '<div class="wk-cke-component wk-cke-image-gallery">' +
                    '<img src="" alt="1" />' +
                    '<img src="" alt="2" />' +
                    '<img src="" alt="3" />' +
                  '</div>',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-image-gallery')
          );
        },
        dialog: 'wk_image_gallery',
        init: function() {
          const el = this.element;
//          const action = el.getAttribute('data-wk-cke-button-action');
        },
        data: function() {
          const el = this.element;
//          const action = this.data.action;
        },
      });
    },
  });
})();
