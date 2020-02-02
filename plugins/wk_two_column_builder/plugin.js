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

          if (el.hasClass('wk-cke-ratio-6-6')){
            this.setData('ratio', '6-6');
          }

          if (el.hasClass('wk-cke-ratio-8-4')){
            this.setData('ratio', '8-4');
          }

          if (el.hasClass('wk-cke-ratio-4-8')){
            this.setData('ratio', '4-8');
          }

          if (el.hasClass('align-items-center')){
            this.setData('alignment', 'center');
          }

          if (el.hasClass('align-items-top')){
            this.setData('alignment', 'top');
          }

          if (el.hasClass('wk-cke-reverse')){
            this.setData('reverse', true);
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

          const ratio = this.data.ratio || 'col-col';
          const spacing = this.data.spacing || 'none';
          const alignment = this.data.alignment || 'top';
          const reverse = this.data.reverse || false;

          var ckeClasses = [
            'wk-cke-ratio-6-6',
            'wk-cke-ratio-8-4',
            'wk-cke-ratio-4-8',
            'wk-cke-reverse',
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

          function colSixSix() {
            el.addClass('wk-cke-ratio-6-6');
          }

          function colEightFour() {
            el.addClass('wk-cke-ratio-8-4');
          }

          function colFourEight() {
            el.addClass('wk-cke-ratio-4-8');
          }

          function setReverseOrder() {
            el.addClass('wk-cke-reverse');
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

          switch (ratio) {
            case '6-6':
              colSixSix();
              break;
            case '8-4':
              colEightFour();
              break;
            case '4-8':
              colFourEight();
              break;
            default:
              break;
          }

          if (reverse) {
            setReverseOrder();
          }
        },
      });
    },
  });
})();
