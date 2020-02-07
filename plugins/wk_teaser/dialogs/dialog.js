CKEDITOR.dialog.add('wk_teaser', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_teaser') + 'img/';

  function getTypeOptions(){
    var options = [
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'card-with-image.jpg" />',
        'vertical'
      ],
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'card-with-image-horizontal.jpg" />',
        'horizontal'
      ],
    ];

    return options;
  }

  return {
    title: 'Teaser Options',
    width: 400,
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          id: 'type',
          className: 'wk-display-block',
          type: 'radio',
          label: 'Card Type',
          items: getTypeOptions(),
          setup: function(widget) {
            this.setValue(widget.data.type);
          },
          commit: function(widget) {
              widget.setData('type', this.getValue());
          },
        },
      ]
    }],
  };
});
