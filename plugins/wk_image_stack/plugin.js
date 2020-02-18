(function() {
  CKEDITOR.plugins.add('wk_image_stack', {
    requires: 'widget',
    icons: 'wk_image_stack',
    init: function(editor) {
      editor.widgets.add('wk_image_stack', {
        button: 'Image Stack',
        editables: {
          content: {
            selector: '.wk-cke-image-stack-images',
          }
        },
        requiredContent: '(wk-cke-image-stack)',
        template: '<div class="wk-cke-component wk-cke-image-stack">' +
                    '<div class="wk-cke-image-stack-images">' +
                      '<img src="" alt="1" />' +
                      '<img src="" alt="2" />' +
                      '<img src="" alt="3" />' +
                    '</div>' +
                  '</div>',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-image-stack')
          );
        },
        init: function() {
        },
        data: function() {
        },
      });
    },
  });
})();
