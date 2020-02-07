(function() {
  CKEDITOR.plugins.add('wk_two_column_builder', {
    requires: 'widget',
    icons: 'wk_two_column_builder',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_two_column_builder', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_two_column_builder', {
        button: '2-Column Grid',
        dialog: 'wk_two_column_builder',
        template:
          '<div class="wk-cke-two-column-builder">' +
            '<div class="container wk-cke-container">' +
              '<div class="row wk-cke-row">' +
                '<div class="col wk-cke-col-a">' +
                  'Col A' +
                '</div>' +
                '<div class="col wk-cke-col-b">' +
                  'Col B' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>',
        editables: {
            colA: {
                selector: '.wk-cke-col-a',
            },
            colB: {
                selector: '.wk-cke-col-b',
            },
        },
        requiredContent: 'div(!wk-cke-two-column-builder)',
        upcast: function(element) {
          if (
            element.name === 'div' &&
            element.hasClass('wk-cke-two-column-builder')
          ) {
            return true;
          }
          return false;
        },
        init: function() {
          const el = this.element;

          if (
            !el.hasClass('wk-cke-image-text') &&
            !el.hasClass('wk-cke-text-image')
          ) {
            this.setData('layout', 'wk-cke-image-text');
          }

          if (el.hasClass('wk-cke-image-text')) {
            this.setData('layout', 'wk-cke-image-text');
          }

          if (el.hasClass('wk-cke-text-image')) {
            this.setData('layout', 'wk-cke-text-image');
          }

          if (
            !el.hasClass('wk-cke-6-6') &&
            !el.hasClass('wk-cke-8-4') &&
            !el.hasClass('wk-cke-4-8')
          ) {
            this.setData('ratio', 'wk-cke-6-6');
          }

          if (el.hasClass('wk-cke-6-6')) {
            this.setData('ratio', 'wk-cke-6-6');
          }

          if (el.hasClass('wk-cke-8-4')) {
            this.setData('ratio', 'wk-cke-8-4');
          }

          if (el.hasClass('wk-cke-4-8')) {
            this.setData('ratio', 'wk-cke-4-8');
          }

          if (
            !el.hasClass('wk-cke-align-items-center') &&
            !el.hasClass('wk-cke-align-items-top')
          ) {
            this.setData('alignment', 'wk-cke-align-items-top');
          }

          if (el.hasClass('wk-cke-align-items-center')){
            this.setData('alignment', 'wk-cke-align-items-center');
          }

          if (el.hasClass('wk-cke-align-items-top')){
            this.setData('alignment', 'wk-cke-align-items-top');
          }

          if (
            !el.hasClass('spacer-top-lg') &&
            !el.hasClass('spacer-bottom-lg')
          ) {
            this.setData('spacing', 'none');
          }

          if (
            el.hasClass('spacer-top-lg') &&
            el.hasClass('spacer-bottom-lg')
          ) {
            this.setData('spacing', 'both');
          }

          if (
            el.hasClass('spacer-top-lg') &&
            !el.hasClass('spacer-bottom-lg')
          ) {
            this.setData('spacing', 'above');
          }

          if (
            !el.hasClass('spacer-top-lg') &&
            el.hasClass('spacer-bottom-lg')
          ) {
            this.setData('spacing', 'below');
          }
        },
        data: function() {
          const el = this.element;

          const layout = this.data.layout;
          const ratio = this.data.ratio;
          const spacing = this.data.spacing;
          const alignment = this.data.alignment;

          var ckeClasses = [
            'wk-cke-image-text',
            'wk-cke-text-image',
            'wk-cke-6-6',
            'wk-cke-8-4',
            'wk-cke-4-8',
            'wk-cke-align-items-top',
            'wk-cke-align-items-center',
            'spacer-top-lg',
            'spacer-bottom-lg',
          ];

          for (var i = 0; i < ckeClasses.length; i += 1) {
            el.removeClass(ckeClasses[i]);
          }

          switch (layout) {
            case 'wk-cke-image-text':
              el.addClass('wk-cke-image-text');
              break;
            case 'wk-cke-text-image':
              el.addClass('wk-cke-text-image');
              break;
            default:
              break;
          }

          switch (spacing) {
            case 'both':
              el.addClass('spacer-top-lg');
              el.addClass('spacer-bottom-lg');
              break;
            case 'above':
              el.addClass('spacer-top-lg');
              break;
            case 'below':
              el.addClass('spacer-bottom-lg');
              break;
            default:
              break;
          }

          switch (alignment) {
            case 'wk-cke-align-items-top':
              el.addClass('wk-cke-align-items-top');
              break;
            case 'wk-cke-align-items-center':
              el.addClass('wk-cke-align-items-center');
              break;
            default:
              break;
          }

          switch (ratio) {
            case 'wk-cke-6-6':
              el.addClass('wk-cke-6-6');
              break;
            case 'wk-cke-8-4':
              el.addClass('wk-cke-8-4');
              break;
            case 'wk-cke-4-8':
              el.addClass('wk-cke-4-8');
              break;
            default:
              break;
          }

        },
      });
    },
  });
})();
