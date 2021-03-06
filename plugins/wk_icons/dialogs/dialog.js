CKEDITOR.dialog.add('wk_icons', function(editor) {
  var config = editor.config;
  var dialog;

  function getSizeOptions() {
    var options =   [
      ['Normal', 'text-normal'],
      ['Smaller', 'text-small'],
      ['Large', 'text-large'],
      ['Larger', 'text-larger'],
      ['Largest', 'text-largest'],
    ];

    return options;
  }

  function getColorOptions() {
    var options = [
      ['Primary', 'text-primary'],
      ['Secondary', 'text-secondary'],
      ['White', 'text-white'],
      ['Gray Dark', 'text-gray-dk'],
      ['Gray Medium', 'text-gray-md'],
      ['Gray Light', 'text-gray-lt'],
    ];

    return options;
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

  function getIcomoonOptions(){
    var arr = [];
    var icons = editor.wkIcomoonIcons;

    for (let i = 0, len = icons.length; i < len; i += 1) {
      (function(index) {
        arr.push(makeIconOption(icons[index]));
      })(i);
    }

    return arr;
  }

  function filterIcons(text) {
    var re = new RegExp(text, 'ig');
    var icons = document.querySelectorAll('.wk-cke-icon-list i');

    for (let i = 0; i < icons.length; i += 1) {
      const classString = icons[i].getAttribute('class');
      const td = icons[i].parentElement.parentElement;

      if (td) {
        if (classString.match(re)) {
          td.setAttribute("style", "display: block;");
        } else {
          td.setAttribute("style", "display: none;");
        }
      }
    }
  }

  function handleSearchKeyEvent(event) {
    var text = event.target.value;

    filterIcons(text);
  };

  return {
    title: 'Icon Options',
    width: 400,
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          html: '<p class="wk-dialog-instructions">' +
                  'Refer to Creative/Branding guidelines' +
                '</p>',
          id: 'widget_description',
          type: 'html',
        },
        {
          id: 'size',
          type: 'select',
          label: 'Size',
          items: getSizeOptions(),
          setup: function(widget) {
              this.setValue(widget.data.size);
          },
          commit: function(widget) {
              widget.setData('size', this.getValue());
          },
        },
        {
          id: 'color',
          type: 'select',
          label: 'Color',
          items: getColorOptions(),
          setup: function(widget) {
              this.setValue(widget.data.color);
          },
          commit: function(widget) {
              widget.setData('color', this.getValue());
          },
        },
        {
          className: 'wk-cke-filter',
          id: 'filter',
          type: 'text',
          label: 'Filter/Search',
          setup: function() {
            var el = this.getInputElement().$;

            this.setValue('');

            el.focus();
            el.addEventListener('keyup', handleSearchKeyEvent);
          },
        },
        {
          id: 'icon',
          type: 'radio',
          label: 'Icon',
          items: getIcomoonOptions(),

          setup: function(widget) {
            var el = this.getInputElement().$;
            var tds = el.querySelectorAll('td');

            el.classList.add('wk-cke-icon-list');

            for (var i = 0; i < tds.length; i += 1) {
              tds[i].removeAttribute('style');
            }

            this.setValue(widget.data.icon);
          },
          commit: function(widget) {
              widget.setData('icon', this.getValue());
          },
        },
      ]
    }],
  };
});
