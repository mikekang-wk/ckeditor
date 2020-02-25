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
          html: '<p class="wk-dialog-instructions">' +
                  'Use this to link to articles' +
                '</p>',
          id: 'widget_description',
          type: 'html',
        },
        {
          id: 'type',
          className: 'wk-display-block',
          type: 'radio',
          label: 'Type',
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
