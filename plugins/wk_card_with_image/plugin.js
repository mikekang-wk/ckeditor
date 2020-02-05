(function() {
  CKEDITOR.plugins.add('wk_card_with_image', {
    requires: 'widget',
    icons: 'wk_card_with_image',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_card_with_image', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_card_with_image', {
        button: 'Card with Image',
        dialog: 'wk_card_with_image',
        editables: {
          image: {
            selector: '.card-image',
          },
          body: {
            selector: '.card-body',
          },
        },
        template: '<div data-shadow="true" data-js-fade-in-on-scroll class="card teaser wk-cke-card-with-image">' +
          '<div class="teaser-wrapper">' +
            '<div class="card-image">' +
              '<img src="' + this.path + 'img/placeholder.jpg" alt="Image alt..." />' +
            '</div>' +
            '<div class="card-body">' +
              '<p>Content...</p>' +
            '</div>' +
          '</div>' +
        '</div>',
        requiredContent: 'div(!wk-cke-card-with-image)',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-card-with-image')
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
