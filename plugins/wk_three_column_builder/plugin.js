(function() {
  CKEDITOR.plugins.add('wk_three_column_builder', {
    requires: 'widget',
    icons: 'wk_three_column_builder',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_three_column_builder', this.path + 'dialogs/dialog.js');

//      editor.ui.addButton('wk_three_column_builder', {
//        label: '3-column grid',
//        command: 'wk_three_column_builder',
//        icon: this.path + 'icons/wk_three_column_builder.png'
//      });

      editor.widgets.add('wk_three_column_builder', {
        dialog: 'wk_three_column_builder',
//        template:
//          '<div class="wk-cke-three-column-builder">' +
//            '<div class="container wk-cke-container">' +
//              '<div class="row wk-cke-row">' +
//                '<div class="col-lg wk-cke-col-a">' +
//                  'Col A' +
//                '</div>' +
//                '<div class="col-lg wk-cke-col-b">' +
//                  'Col B' +
//                '</div>' +
//                '<div class="col-lg wk-cke-col-c">' +
//                  'Col C' +
//                '</div>' +
//              '</div>' +
//            '</div>' +
//          '</div>',
        editables: {
            colA: {
                selector: '.wk-cke-col-a',
            },
            colB: {
                selector: '.wk-cke-col-b',
            },
            colC: {
                selector: '.wk-cke-col-c',
            },
        },
        requiredContent: 'div(!wk-cke-three-column-builder)',
        upcast: function(element) {
          if (
            element.name === 'div' &&
            element.hasClass('wk-cke-three-column-builder')
          ) {
            return true;
          }
          return false;
        },
        init: function() {
          const el = this.element;

          if (el.hasClass('align-items-center')){
            this.setData('alignment', 'center');
          }

          if (el.hasClass('align-items-top')){
            this.setData('alignment', 'top');
          }

          if (
            el.hasClass('spacer-top-lg') &&
            el.hasClass('spacer-bottom-lg')
          ){
            this.setData('spacing', 'both');
          } else {
            if (el.hasClass('spacer-bottom-lg')) {
              this.setData('spacing', 'below');
            } else if (el.hasClass('spacer-top-lg')) {
              this.setData('spacing', 'above');
            } else {
              this.setData('spacing', 'none');
            }
          }
        },
        data: function() {
          const el = this.element;

          const spacing = this.data.spacing || 'none';
          const alignment = this.data.alignment || 'top';

          var ckeClasses = [
            'align-items-top',
            'align-items-center',
            'spacer-top-lg',
            'spacer-bottom-lg',
          ];

          function removeCKEClasses() {
            for (var i = 0; i < ckeClasses.length; i += 1) {
              el.removeClass(ckeClasses[i]);
            }
          }

          function alignTop() {
            el.addClass('align-items-top');
          }

          function alignCenter() {
            el.addClass('align-items-center');
          }

          function addTopSpace() {
            el.addClass('spacer-top-lg');
          }

          function addBottomSpace() {
            el.addClass('spacer-bottom-lg');
          }

          removeCKEClasses();

          switch (spacing) {
            case 'both':
              addTopSpace();
              addBottomSpace();
              break;
            case 'above':
              addTopSpace();
              break;
            case 'below':
              addBottomSpace();
              break;
            default:
              break;
          }

          switch (alignment) {
            case 'top':
              alignTop();
              break;
            case 'center':
              alignCenter();
              break;
            default:
              break;
          }

        },
      });
    },
  });
})();
