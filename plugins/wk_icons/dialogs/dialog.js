CKEDITOR.dialog.add('wk_icons', function(editor) {
  var config = editor.config;
  var dialog;

  return {
    title: 'Choose Icon',
    width: 400,
    contents: [{
      id: 'tab1',
      label: '',
      expand: true,
      title: '',
      padding: 0,
      elements: [
        {
          id: 'size',
          type: 'select',
          label: 'Icon Size',
          items: [
            ['Normal', 'font-size-normal'],
            ['Smaller', 'font-size-smaller'],
            ['Large', 'font-size-large'],
            ['Larger', 'font-size-larger'],
            ['Largest', 'font-size-largest'],
          ],
          setup: function(widget) {
              this.setValue(widget.data.size || 'font-size-normal');
          },
          commit: function(widget) {
              widget.setData('size', this.getValue());
          },
        },
        {
          className: 'wk-cke-filter',
          id: 'filter',
          type: 'text',
          label: 'Filter',
          setup: function() {
            var el = this.getInputElement().$;

            this.setValue('');

            el.focus();
            el.addEventListener('keyup', editor.handleSearchKeyEvent);
          },
        },
        {
          id: 'icon',
          type: 'radio',
          label: 'Choose Icon',
          items: editor.getIconOptions(),

          setup: function(widget) {
            var el = this.getInputElement().$;
            var tds = el.querySelectorAll('td');

            el.classList.add('wk-cke-icon-list');

            for (var i = 0; i < tds.length; i += 1) {
              tds[i].removeAttribute('style');
            }

            this.setValue(widget.data.icon || 'icon-workiva-w');
          },
          commit: function(widget) {
              widget.setData('icon', this.getValue());
          },
        },
      ]
    }],
  };
});
