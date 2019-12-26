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
          id: 'align',
          type: 'select',
          label: 'Align',
          items: [
              [ editor.lang.common.notSet, '' ],
              [ editor.lang.common.alignLeft, 'left' ],
              [ editor.lang.common.alignRight, 'right' ],
              [ editor.lang.common.alignCenter, 'center' ]
          ],
          setup: function( widget ) {
              this.setValue( widget.data.align );
          },
          commit: function( widget ) {
              widget.setData( 'align', this.getValue() );
          }
        },
        {
          id: 'width',
          type: 'text',
          label: 'Width',
          setup: function( widget ) {
              this.setValue( widget.data.width );
          },
          commit: function(widget) {
              widget.setData('width', this.getValue());
          }
        }
      ]
    }],
  };
});
