(function() {
  CKEDITOR.plugins.add('wk_teaser', {
    requires: 'widget',
    icons: 'wk_teaser',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_teaser', this.path + 'dialogs/dialog.js');

      editor.ui.addButton('wk_teaser', {
        label: 'Teaser',
        command: 'wk_teaser',
        icon: this.path + 'icons/wk_teaser.png'
      });

      editor.widgets.add('wk_teaser', {
        dialog: 'wk_teaser',
        editables: {
          image: {
            selector: '.card-image',
          },
          body: {
            selector: '.card-body',
          },
        },
        template: '<div data-shadow="true" data-js-fade-in-on-scroll class="card teaser wk-cke-teaser">' +
          '<div class="teaser-wrapper">' +
            '<div class="card-image">' +
              '<img src="' + this.path + 'img/sample-content-thumbnail-16-9.jpg" alt="Image alt..." />' +
            '</div>' +
            '<div class="card-body">' +
              '<h3>Sample Title</h3>' +
              '<p>Sample body copy ipsum dolor sit amet...</p>' +
            '</div>' +
          '</div>' +
        '</div>',
        requiredContent: 'div(!wk-cke-teaser)',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-teaser')
          );
        },
        init: function() {
          const el = this.element;

          if (el.hasClass('teaser-horizontal')) {
            this.setData('type', 'horizontal');
          } else {
            this.setData('type', 'vertical');
          }
        },
        data: function() {
          const el = this.element;
          const type = this.data.type;
          const className = 'teaser-horizontal';

          el.removeClass(className);

          if (type === 'horizontal') {
            el.addClass(className);
          }

        },
      });
    },
  });
})();
