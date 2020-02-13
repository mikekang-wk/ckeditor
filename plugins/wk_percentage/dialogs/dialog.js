CKEDITOR.dialog.add('wk_percentage', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_percentage') + 'img/';

  function populatePercentageOptions() {
    var options = [];

    for (var i = 0; i < 1000; i +=1) {
      (function(index){
        var option = [i, i];

        options.push(option);
      })(i);
    }
    return options;
  }

  return {
    title: 'Animated Percentage Options',
    width: 400,
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          type: 'html',
          html: '<label class="cke_dialog_ui_labeled_label">Example</label>' +
                '<div>' +
                  '<img class="wk-cke-dialog-image" src="' + imgPath + 'animated-percentage.gif" />' +
                '</div>'
        },
        {
          id: 'percentage',
          type: 'select',
          label: 'Percentage',
          items: populatePercentageOptions(),
          setup: function(widget) {
              document.getElementById(this.domId).focus();
              this.setValue(widget.data.percentage || 0);
          },
          commit: function(widget) {
              widget.setData('percentage', this.getValue());
          },
        },
      ]
    }],
  };
});
