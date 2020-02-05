CKEDITOR.dialog.add('wk_three_column_builder', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_three_column_builder') + 'img/';

  return {
    title: 'Edit',
    contents: [{
      id: 'tab1',
      label: '',
      expand: true,
      title: '',
      padding: 0,
      elements: [
        {
          type: 'html',
          html: '<img class="wk-cke-dialog-image" src="' + imgPath + 'three-columns.jpg" />'
        },
        {
          id: 'spacing',
          type: 'select',
          label: 'Add Spacing',
          items: [
            ['None', 'none'],
            ['Above', 'above'],
            ['Below', 'below'],
            ['Above and Below', 'both'],
          ],
          setup: function(widget) {
            this.setValue(widget.data.spacing || 'none');
          },
          commit: function(widget) {
              widget.setData('spacing', this.getValue());
          },
        },
        {
          id: 'alignment',
          type: 'select',
          label: 'Vertical Alignment',
          items: [
            ['Top', 'top'],
            ['Center', 'center'],
          ],
          setup: function(widget) {
            this.setValue(widget.data.alignment || 'top');
          },
          commit: function(widget) {
              widget.setData('alignment', this.getValue());
          },
        },
      ]
    }],
  };
});
