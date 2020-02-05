(function() {
  CKEDITOR.plugins.add('wk_button', {
    requires: 'widget',
    icons: 'wk_button',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_button', this.path + 'dialogs/dialog.js');

      editor.widgets.add('wk_button', {
        button: 'Call to Action',
        editables: {},
        requiredContent: '(wk-cke-button)',
        template: '<a class="wk-cke-button" href="#"></a>',
        upcast: function(element) {
          return (
            element.name === 'a' &&
            element.hasClass('wk-cke-button')
          );
        },
        dialog: 'wk_button',
        init: function() {
          const el = this.element;
          const action = el.getAttribute('data-wk-cke-button-action');
          const appearance = el.getAttribute('data-wk-cke-button-appearance');
          const reference = el.getAttribute('data-wk-cke-button-reference');
          const text = el.getAttribute('data-wk-cke-button-text');

          if (action) {
            this.setData('action', action);
          }

          if (appearance) {
            this.setData('appearance', appearance);
          }

          if (reference) {
            this.setData('reference', reference);
          }

          if (text) {
            this.setData('text', text);
          }
        },
        data: function() {
          const el = this.element;

          const action = this.data.action;
          const appearance = this.data.appearance;
          const reference = this.data.reference;
          const text = this.data.text;

          function makeLink() {
            el.setAttribute('href', reference);
          }

          function makeLinkTab() {
            el.setAttribute('href', reference);
            el.setAttribute('target', '_blank');
          }

          function makeMarketoButton() {
            el.addClass('button-marketo-event');
            el.setAttribute('data-target', '#wk_modal');
            el.setAttribute('data-toggle', 'modal');
            el.setAttribute('data-form-nid', reference);
          }

          function makeWistiaButton() {
            el.addClass('wistia_embed');
            el.addClass('wistia_async_' + reference);
            el.addClass('popover=true');
            el.addClass('popoverAnimateThumbnail=true');
            el.addClass('popoverContent=link');
          }

          function hardReset () {
            var ckeClasses = el.getAttribute('class');
            var dataAtts = [
              'target',
              'toggle',
              'node-id',
              'form-nid',
              'target',
              'toggle',
              'wk-cke-button-action',
              'wk-cke-button-appearance',
              'wk-cke-button-reference',
              'wk-cke-button-text',
            ];

            if (ckeClasses){
              var ckeClassesArray = ckeClasses.split(' ');

              for (var i = 0; i < ckeClassesArray.length; i += 1) {
                if (
                  ckeClassesArray[i] !== 'wk-cke-button' && ckeClassesArray[i] !== 'cke_widget_element'
                ) {
                  el.removeClass(ckeClassesArray[i]);
                }
              }
            }

            for (var i = 0; i < dataAtts.length; i += 1) {
              el.data(dataAtts[i], false);
            }

            el.removeAttribute('style');
            el.removeAttribute('target');
            el.setAttribute('href', '/');
          }

          hardReset();

          if (action) {
            el.data('wk-cke-button-action', action);

            switch (action) {
              case 'link':
                makeLink();
                break;
              case 'link-tab':
                makeLinkTab();
                break;
              case 'form':
                makeMarketoButton();
                break;
              case 'video':
                makeWistiaButton();
                break;
              default:
                break;
            };
          }

          if (appearance) {
            el.data('wk-cke-button-appearance', appearance);

            switch (appearance) {
              case 'link-arrow':
                el.addClass('btn-link');
                el.addClass('fancy-underline');
                el.addClass('link-arrow');
                break;
              case 'primary':
                el.addClass('btn');
                el.addClass('btn-primary');
                break;
              case 'secondary':
                el.addClass('btn');
                el.addClass('btn-secondary');
                break;
              case 'tertiary':
                el.addClass('btn');
                el.addClass('btn-tertiary');
                break;
              default:
                break;
            }
          }

          if (reference) {
            el.data('wk-cke-button-reference', reference);
          }

          if (text) {
            el.data('wk-cke-button-text', text);
            el.setText(text);
          }
        },
      });
    },
  });
})();
