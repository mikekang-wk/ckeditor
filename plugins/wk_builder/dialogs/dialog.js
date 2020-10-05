CKEDITOR.dialog.add('wk_builder_dialog', function(editor) {
  var components = [
    {
      name: 'three-column-grid',
      html: '<div class="wk-cke-three-column-builder">' +
              '<div class="container wk-cke-container">' +
                '<div class="row wk-cke-row">' +
                  '<div class="col-lg wk-cke-col-a">' +
                    'Col A' +
                  '</div>' +
                  '<div class="col-lg wk-cke-col-b">' +
                    'Col B' +
                  '</div>' +
                  '<div class="col-lg wk-cke-col-c">' +
                    'Col C' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>',
    },
    {
      name: 'icon',
      html: '<i class=\'wk-cke-icon icon-workiva-w\'>&nbsp;</i>',
    },
  ];

  function getTypeOptions() {
    var options = [];

    function makeLabelWithImage(obj){
      var imgPath = CKEDITOR.plugins.getPath('wk_builder') + 'img/';
      var label = '';

      label += '<strong>' + obj.name + '</strong>';
      label += '<br />';
      label += '<img class=\'wk-cke-dialog-image\' src=\'' + imgPath + obj.name + '.jpg\' />';

      return label;
    }

    for (var i = 0; i < components.length; i++) {
      options.push([
        makeLabelWithImage(components[i]),
        components[i].name,
      ]);
    }

    return options;
  }

  function getOptionHTML(option) {
    var html;

    for (var i = 0; i < components.length; i++) {
      var o = components[i];

      if (o.name === option) {
        html = o.html;
      }
    }

    return html;
  }

  return {
//  minWidth: 400,
    title: 'Choose a Component',
    contents: [
      {
        id: 'tab-components',
        label: 'Components',
        elements: [
            {
              id: 'component',
              type: 'radio',
              items: getTypeOptions(),
              commit: function(widget) {
                  widget.setData('layout', this.getValue());
              },
            },
        ]
      },
    ],
    onOk: function() {
      var option = this.getValueOf('tab-components', 'component')
      var optionHTML = getOptionHTML(option);

      editor.insertHtml(optionHTML);
    }
  };
});
