(function() {
  CKEDITOR.plugins.add('wk_percentage', {
    requires: 'widget',
    icons: 'wk_percentage',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_percentage', this.path + 'dialogs/dialog.js');

      var icomoonIcons;

      editor.wk_populatePercentageOptions = function() {
        var options = [];

        for (var i = 0; i < 101; i +=1) {
          (function(index){
            var option = [i, i];

            options.push(option);
          })(i);
        }
        return options;
      }

      editor.widgets.add('wk_percentage', {
        button: 'Cards',
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
          }
        },
        data: function() {
          const el = this.element;
          const percentage = this.data.percentage || 0;

          if (percentage) {
            el.data('percentage', percentage);
            el.setText(percentage);
          }
        },
      });
    },
  });
})();
