CKEDITOR.dialog.add('wk_percentage', function(editor) {
  var config = editor.config;
  var dialog;

  return {
    title: 'Edit Percentage',
    width: 400,
    contents: [{
      id: 'tab1',
      label: '',
      expand: true,
      title: '',
      padding: 0,
      elements: [
        {
          id: 'percentage',
          type: 'select',
          label: 'Percentage',
          items: editor.wk_populatePercentageOptions(),
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
