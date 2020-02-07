CKEDITOR.dialog.add('wk_card_with_image', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_card_with_image') + 'img/';

  function getShadowOptions(){
    var options = [
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'card-with-image.jpg" />',
        'true'
      ],
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'card-with-image-horizontal.jpg" />',
        'false'
      ],
    ];

    return options;
  }

  return {
    title: 'Edit Card with Image',
    width: 400,
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          id: 'shadow',
          className: 'wk-display-block',
          type: 'radio',
          label: 'Card Type',
          items: getShadowOptions(),
          setup: function(widget) {
            this.setValue(widget.data.shadow);
          },
          commit: function(widget) {
              widget.setData('shadow', this.getValue());
          },
        },
      ]
    }],
  };
});
