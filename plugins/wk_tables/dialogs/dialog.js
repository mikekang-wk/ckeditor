CKEDITOR.dialog.add('wk_tables', function(editor) {
  var config = editor.config;
  var dialog;

  return {
    title: 'Edit Table',
    contents: [{
      id: 'tab1',
      label: '',
      expand: true,
      title: '',
      padding: 0,
      elements: [
        {
          id: 'columns',
          type: 'select',
          label: 'Columns',
          items: editor.tableData.populateTableOptions(editor.tableData.maxColumns),
          setup: function(widget) {
            this.setValue(widget.data.columns || '1');
          },
          commit: function(widget) {
            widget.setData('columns', this.getValue());
          },
        },
        {
          id: 'rows',
          type: 'select',
          label: 'Rows',
          items: editor.tableData.populateTableOptions(editor.tableData.maxRows),
          setup: function(widget) {
            this.setValue(widget.data.rows || '1');
          },
          commit: function(widget) {
            widget.setData('rows', this.getValue());
          },
        },
        {
          id: 'json',
          type: 'textarea',
          label: 'JSON',
          setup: function(widget) {
            this.setValue(widget.data.json || '');
          },
          commit: function(widget) {
            widget.setData('json', this.getValue());
          },
        },
      ]
    }],
  };
});

