(function() {
  CKEDITOR.plugins.add('wk_icons', {
    requires: 'widget',
    icons: 'wk_icons',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_icons', this.path + 'dialogs/dialog.js');

      var icomoonIcons;

      editor.widgets.add('wk_icons', {
        button: 'Icons',
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

      // '.closest()' polyfill
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector;
      }

      if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
          var el = this;

          do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
        };
      }

      function addCSS(filename){
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');

        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';

        head.append(style);
      }

      function filterIcons(text) {
        var re = new RegExp(text, 'ig');
        var icons = document.querySelectorAll('.wk-cke-icon-list i');

        for (let i = 0; i < icons.length; i += 1) {
          const classString = icons[i].getAttribute('class');
          const item = icons[i].closest('td');

          if (item) {
            if (classString.match(re)) {
              item.setAttribute("style", "display: block;");
            } else {
              item.setAttribute("style", "display: none;");
            }
          }
        }
      }

      function makeIconOption(icon) {
        var option = [];

        var iconName = icon.properties.name;
        var iconClass = 'icon-' + iconName;

        var label = '<i class="icon-' + iconName + '"></i> ';

        label += iconClass;

        option.push(label);
        option.push(iconClass);

        return option;
      }

      editor.handleSearchKeyEvent = function(event) {
        var text = event.target.value;

        filterIcons(text);
      };

      addCSS('https://d1azc1qln24ryf.cloudfront.net/49134/WorkivaUI/style-cf.css');

      addCSS(this.path + 'css/styles.css');

      var icomoonAJAX = (function(){
        var endpoint = 'https://i.icomoon.io/public/a5dc34c96c/WorkivaUI/selection.json';

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);

            icomoonIcons = response.icons;

            editor.getIconOptions = function(){
              var arr = [];

              for (let i = 0, len = icomoonIcons.length; i < len; i += 1) {
                (function(index) {
                  arr.push(makeIconOption(icomoonIcons[index]));
                })(i);
              }

              return arr;
            };
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
