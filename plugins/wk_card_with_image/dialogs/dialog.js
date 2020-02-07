CKEDITOR.dialog.add('wk_card_with_image', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_card_with_image') + 'img/';

  return {
    title: 'Edit Card with Image',
    width: 400,
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
            type: 'html',
            html: '<img class="wk-cke-dialog-image" src="' + imgPath + 'card-with-image.jpg" />'
        },
        {
          id: 'shadow',
          type: 'checkbox',
          label: 'Shadow',
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
