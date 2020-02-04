(function() {
  CKEDITOR.plugins.add('wk_card', {
    requires: 'widget',
    icons: 'wk_card',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_card', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_card', {
        button: 'Cards',
        editables: {
          body: {
            selector: '.card-body',
          },
        },
        template: '<div data-js-fade-in-on-scroll class="card teaser wk-cke-card-with-image">' +
          '<div class="teaser-wrapper">' +
            '<div class="card-body">' +
              '<p>Content...</p>' +
            '</div>' +
          '</div>' +
        '</div>',
        requiredContent: 'div(!wk-cke-card-with-image)',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-teaser')
          );
        },
        init: function() {},
        data: function() {},
      });
    },
  });
})();
