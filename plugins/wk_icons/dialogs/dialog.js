CKEDITOR.dialog.add('wk_icons', function(editor) {
  var config = editor.config;
  var dialog;

  return {
    title: 'Choose Icon',
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
          id: 'filter',
          type: 'text',
          label: 'Filter',
          setup: function() {
            var el = this.getInputElement().$;
            var parentEl = el.parentElement;

            editor.clearFilterText(el);
            editor.showAllIcons();

            document.addEventListener('keyup', editor.handleSearchKeyEvent);
            parentEl.appendChild(editor.iconChoicesList);
          },
        },
        {
          id: 'icon',
          type: 'text',
          setup: function(widget) {
            var el = this.getInputElement().$;
            el.setAttribute('type', 'hidden');

            editor.resetSelection();

            var icon = widget.data.icon || '';

            this.setValue(icon);

            if (icon) {
              editor.presetSelection(icon);
            }
          },
          commit: function(widget) {
            var el = this.getInputElement().$;
            var container = el.closest('table');
            var icon = editor.getCheckedValue(container);

            el.value = icon;

            if (icon) {
              widget.setData('icon', icon);
            }
          },
        },
      ]
    }],
  };
});
