CKEDITOR.dialog.add('wk_builder', function(editor) {
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
          id: 'layout',
          type: 'radio',
          label: 'Choose Layout',
          items: editor.populateLayoutOptions(),
          setup: function(widget) {
            this.setValue(widget.data.layout || 'a-a-a');
          },
          commit: function(widget) {
              widget.setData('layout', this.getValue());
          },
        },
        {
          id: 'spacing',
          type: 'select',
          label: 'Set Spacing',
          items: [
            ['None', 'none'],
            ['Above', 'both'],
            ['Below', 'top'],
            ['Above and Below', 'bottom'],
          ],
          setup: function(widget) {
            this.setValue(widget.data.layout || 'none');
          },
          commit: function(widget) {
              widget.setData('spacing', this.getValue());
          },
        },
        {
          id: 'alignment',
          type: 'select',
          label: 'Set Alignment',
          items: [
            ['Top', 'top'],
            ['Center', 'center'],
          ],
          setup: function(widget) {
            this.setValue(widget.data.layout || 'top');
          },
          commit: function(widget) {
              widget.setData('alignment', this.getValue());
          },
        },
      ]
    }],
  };
});
