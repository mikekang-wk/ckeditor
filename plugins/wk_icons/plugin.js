(function() {
  CKEDITOR.plugins.add('wk_icons', {
    requires: 'widget',
    icons: 'wk_icons',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_icons', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_icons', {
        button: 'Icon',
        dialog: 'wk_icons',
        editables: {},
        template: '<i class="wk-cke-icon">&nbsp;</i>',
        requiredContent: 'i(!wk-cke-icon)',
        upcast: function(element) {
          return (
            element.name === 'i' &&
            element.hasClass('wk-cke-icon')
          );
        },
        init: function() {
          const el = this.element;

          const iconName = el.getAttribute('data-name');
          const iconSize = el.getAttribute('data-size');
          const iconColor = el.getAttribute('data-color');

          if (iconName) {
            this.setData('icon', iconName);
          } else {
            this.setData('icon', 'icon-book');
          }

          if (iconSize) {
            this.setData('size', iconSize);
          } else {
            this.setData('size', 'text-normal');
          }

          if (iconColor) {
            this.setData('color', iconColor);
          } else {
            this.setData('color', 'text-gray-dk');
          }
        },
        data: function() {
          const el = this.element;
          const iconName = this.data.icon || '';
          const iconSize = this.data.size || '';
          const iconColor = this.data.color || '';

          const className = el.getAttribute('class');

          let ckeClasses;

          if (className) {
            ckeClasses = className.split(' ');
          }

          for (var i = 0; i < ckeClasses.length; i += 1) {
            if (ckeClasses[i] !== 'wk-cke-icon') {
             el.removeClass(ckeClasses[i]);
            }
          }

          el.addClass(iconName);
          el.addClass(iconSize);
          el.addClass(iconColor);

          el.data('name', iconName);
          el.data('size', iconSize);
          el.data('color', iconColor);
        },
      });

      var icomoonAJAX = (function(){
        var endpoint = 'https://i.icomoon.io/public/a5dc34c96c/WorkivaUI/selection.json';

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);

            editor.wkIcomoonIcons = response.icons;
          } else {
            console.log('XHR request failed');
          }
        };

        xhr.open('GET', endpoint);
        xhr.send();
      })();
    },
  });
})();
