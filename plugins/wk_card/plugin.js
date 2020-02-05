(function() {
  CKEDITOR.plugins.add('wk_card', {
    requires: 'widget',
    icons: 'wk_card',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_card', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_card', {
        button: 'Card',
        dialog: 'wk_card',
        editables: {
          body: {
            selector: '.card-body',
          },
        },
        template: '<div data-js-fade-in-on-scroll class="card teaser wk-cke-card">' +
          '<div class="teaser-wrapper">' +
            '<div class="card-body">' +
              '<p>Content...</p>' +
            '</div>' +
          '</div>' +
        '</div>',
        requiredContent: 'div(!wk-cke-card)',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-card')
          );
        },
        init: function() {
          const el = this.element;
          const shadow = el.getAttribute('data-shadow');

          if (shadow) {
            this.setData('shadow', shadow);
          } else {
            this.setData('shadow', false);
          }
        },
        data: function() {
          const el = this.element;
          const shadow = this.data.shadow;
          const className = 'noshadow';

          el.data('shadow', shadow);
          el.removeClass(className);

          if (!shadow) {
            el.addClass(className);
          }
        },
      });
    },
  });
})();
