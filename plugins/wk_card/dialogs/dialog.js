CKEDITOR.dialog.add('wk_card', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_card') + 'img/';

  function getShadowOptions(){
    var options = [
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'card.jpg" />',
        'true'
      ],
      [
        '<img class="wk-cke-dialog-image" src="' + imgPath + 'card-noshadow.jpg" />',
        'false'
      ],
    ];

    return options;
  }

  return {
    title: 'Card Options',
    width: 400,
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          html: '<p class="wk-dialog-instructions">' +
                  'Generic container for isolated content' +
                '</p>',
          id: 'widget_description',
          type: 'html',
        },
        {
          className: 'wk-display-block',
          id: 'shadow',
          type: 'radio',
          label: 'Type',
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
