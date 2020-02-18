(function() {
  CKEDITOR.plugins.add('wk_percentage', {
    requires: 'widget',
    icons: 'wk_percentage',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_percentage', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_percentage', {
        button: 'Percent',
        dialog: 'wk_percentage',
        template: '<div data-js-animated-percentage class="wk-cke-percentage-animation percentage-animation">' +
                    '70' +
                  '</div>',
        requiredContent: 'div(!wk-cke-percentage-animation)',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('wk-cke-percentage-animation')
          );
        },
        init: function() {
          const el = this.element;
          const percentage = el.getAttribute('data-percentage');

          if (percentage) {
            this.setData('percentage', percentage);
          } else {
            this.setData('percentage', '0');
          }
        },
        data: function() {
          const el = this.element;
          const percentage = this.data.percentage;

          if (percentage) {
            el.data('percentage', percentage);
            el.setText(percentage + '%');
          }
        },
      });
    },
  });
})();
