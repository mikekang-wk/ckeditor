﻿(function() {
  CKEDITOR.plugins.add('wk_icons', {
    requires: 'widget',
    icons: 'wk_icons',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_icons', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_icons', {
        button: 'Icon',
        dialog: 'wk_icons',
        editables: {},
        template: '<i class="wk-cke-icon">i</i>',
        requiredContent: 'i(!wk-cke-icon)',
        upcast: function(element) {
          return (
            element.name === 'i' &&
            element.hasClass('wk-cke-icon')
          );
        },
        init: function() {
          const el = this.element;

          const iconName = el.getAttribute('data-icon-name');
          const iconSize = el.getAttribute('data-icon-size');

          if (iconName) {
            this.setData('icon', iconName);
          }

          if (iconSize) {
            this.setData('size', iconSize);
          }
        },
        data: function() {
          const el = this.element;
          const iconName = this.data.icon || '';
          const iconSize = this.data.size || '';
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

          if (iconName) {
            el.data('icon-name', iconName);
            el.addClass(iconName);
          }

          if (iconSize) {
            el.data('icon-size', iconSize);
            el.addClass(iconSize);
          }
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
