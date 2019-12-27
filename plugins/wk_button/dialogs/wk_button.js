CKEDITOR.dialog.add( 'wk_button', function(editor) {
  var config = editor.config;
  var dialog;

  return {
    title: 'Edit Call to Action',
    contents: [ {
      id: 'tab1',
      label: '',
      title: '',
      expand: true,
      padding: 0,
      elements: [
        {
          id: 'action',
          type: 'select',
          label: 'Action',
          items: [
            ['Link to another page', 'link'],
            ['Link to another page in a new tab', 'link-tab'],
            ['Open a Marketo form in a modal', 'form'],
            ['Play a video in a modal', 'video'],
          ],
          setup: function(widget) {
              this.setValue(widget.data.action || 'link');
          },
          commit: function(widget) {
              widget.setData('action', this.getValue());
          },
        },
        {
          id: 'appearance',
          type: 'select',
          label: 'Appearance',
          items: [
            ['Link Arrow', 'link-arrow'],
            ['Primary Button', 'primary'],
            ['Secondary Button', 'secondary'],
            ['Tertiary Button', 'tertiary'],
          ],
          setup: function(widget) {
              this.setValue(widget.data.appearance || 'link-arrow');
          },
          commit: function(widget) {
              widget.setData('appearance', this.getValue());
          }
        },
        {
          id: 'reference',
          type: 'text',
          label: 'Reference (URL / Video ID / Marketo Node ID)',
          setup: function(widget) {
              this.setValue(widget.data.reference || '/');
          },
          commit: function(widget) {
              widget.setData('reference', this.getValue());
          }
        },
      ]
    }],
  };
});
