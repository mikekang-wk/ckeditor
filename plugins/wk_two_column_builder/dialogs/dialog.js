CKEDITOR.dialog.add('wk_two_column_builder', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_two_column_builder') + 'img/';

  function getTypeOptions() {
    var options = [
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'image-text.jpg" />',
        'image-text',
      ],
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'text-image.jpg" />',
        'text-image',
      ],
    ];

    return options;
  }

  return {
    title: 'Two Column Grid Options',
    contents: [{
      id: 'tab1',
      label: '',
      expand: true,
      title: '',
      elements: [
        {
          className: 'wk-display-block',
          id: 'layout',
          type: 'radio',
          label: 'Choose Layout (note: IMAGE column stacks on top of TEXT column on mobile)',
          items: getTypeOptions(),
          setup: function(widget) {
              this.setValue(widget.data.layout || '');
          },
          commit: function(widget) {
              widget.setData('layout', this.getValue());
          },
        },
        {
          id: 'ratio',
          type: 'select',
          label: 'Column Width Ratio (12)',
          items: [
            [
              '6:6',
              '6-6',
            ],
            [
              '8:4',
              '8-4',
            ],
            [
              '4:8',
              '4-8',
            ],
          ],
          setup: function(widget) {
            this.setValue(widget.data.ratio || '6-6');
          },
          commit: function(widget) {
            widget.setData('ratio', this.getValue());
          },
        },
        {
          id: 'spacing',
          type: 'select',
          label: 'Spacing',
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
