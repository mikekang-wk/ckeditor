CKEDITOR.dialog.add('wk_image_gallery', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_button') + 'img/';

  function getGalleryOptions(){
    var linkArrowPath = imgPath + 'link-arrow.jpg';
    var primaryButtonPath = imgPath + 'primary-button.jpg';
    var secondaryButtonPath = imgPath + 'secondary-button.jpg';
    var tertiaryButtonPath = imgPath + 'tertiary-button.jpg';

    var arr = [
      ['<img src="' + linkArrowPath + '"/>', 'stack'],
      ['<img src="' + primaryButtonPath + '" />', 'slider-caption'],
    ];

    return arr;
  }

  return {
    title: 'Image Gallery Options',
    contents: [ {
      id: 'tab1',
      expand: true,
      elements: [
        {
          className: 'wk-display-block',
          id: 'appearance',
          type: 'radio',
          label: 'Appearance',
          items: getGalleryOptions(),
          setup: function(widget) {
              this.setValue(widget.data.appearance);
          },
          commit: function(widget) {
              widget.setData('appearance', this.getValue());
          },
        },
      ]
    }],
  };
});
