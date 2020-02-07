CKEDITOR.dialog.add('wk_button', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_button') + 'img/';

  function getActionOptions(){
    var linkArrowPath = imgPath + 'link-arrow.jpg';
    var primaryButtonPath = imgPath + 'primary-button.jpg';
    var secondaryButtonPath = imgPath + 'secondary-button.jpg';
    var tertiaryButtonPath = imgPath + 'tertiary-button.jpg';

    var arr = [
      ['<img src="' + linkArrowPath + '" title="link-arrow" />', 'link-arrow'],
      ['<img src="' + primaryButtonPath + '" title="primary-button" />', 'primary'],
      ['<img src="' + secondaryButtonPath + '" title="secondary-button" />', 'secondary'],
      ['<img src="' + tertiaryButtonPath + '" title="tertiary-button" />', 'tertiary'],
    ];

    return arr;
  }

  return {
    title: 'Call to Action Options',
    contents: [ {
      id: 'tab1',
      expand: true,
      elements: [
        {
          className: 'wk-display-block',
          id: 'appearance',
          type: 'radio',
          label: 'Appearance',
          items: getActionOptions(),
          setup: function(widget) {
              this.setValue(widget.data.appearance);
          },
          commit: function(widget) {
              widget.setData('appearance', this.getValue());
          },
        },
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
              this.setValue(widget.data.action);
          },
          commit: function(widget) {
              widget.setData('action', this.getValue());
          },
        },
        {
          id: 'reference',
          type: 'text',
          label: 'Reference (URL / Video ID / Marketo Node ID)',
          setup: function(widget) {
              this.setValue(widget.data.reference);
          },
          commit: function(widget) {
              widget.setData('reference', this.getValue());
          },
          validate: function() {
            if(!this.getValue()) {
                alert('All fields are required');
                return false;
            }
          },
        },
        {
          id: 'text',
          type: 'text',
          label: 'Text',
          setup: function(widget) {
              this.setValue(widget.data.text);
          },
          commit: function(widget) {
              widget.setData('text', this.getValue());
          },
          validate: function() {
            if(!this.getValue()) {
                alert('All fields are required');
                return false;
            }
          },
        },
      ]
    }],
  };
});
