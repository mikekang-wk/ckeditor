(function () {
  CKEDITOR.plugins.add('wk_button', {
    requires: 'widget',
    icons: 'wk_button',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_button', this.path + 'dialogs/wk_button.js');

      editor.widgets.add('wk_button', {
        allowedContent:
            'div(!simplebox); div(!simplebox-content); h2(!simplebox-title)',
        button: 'Create a call to action',
        data: function() {

            if ( this.data.width == '' )
                this.element.removeStyle( 'width' );
            else
                this.element.setStyle( 'width', this.data.width );

            this.element.removeClass( 'align-left' );
            this.element.removeClass( 'align-right' );
            this.element.removeClass( 'align-center' );
            if ( this.data.align )
                this.element.addClass( 'align-' + this.data.align );
        },
        dialog: 'wk_button',
        editables: {
            title: {
                selector: '.simplebox-title'
            },
            content: {
                selector: '.simplebox-content'
            }
        },
        init: function() {
            var width = this.element.getStyle( 'width' );
            if ( width )
                this.setData( 'width', width );
            if ( this.element.hasClass( 'align-left' ) )
                this.setData( 'align', 'left' );
            if ( this.element.hasClass( 'align-right' ) )
                this.setData( 'align', 'right' );
            if ( this.element.hasClass( 'align-center' ) )
                this.setData( 'align', 'center' );
        },
        requiredContent: 'div(simplebox)',
        template:
        '<div class="simplebox">' +
            '<h2 class="simplebox-title">Title</h2>' +
            '<div class="simplebox-content"><p>Content...</p></div>' +
        '</div>',
        upcast: function(element) {
          return element.name == 'div' && element.hasClass( 'simplebox');
        }
      });
    },
  });
})();
