(function () {
  CKEDITOR.plugins.add('wk_button', {
    requires: 'widget',
    icons: 'wk_button',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_button', this.path + 'dialogs/wk_button.js');

      editor.widgets.add('wk_button', {
        button: 'Create a Call to Action',
        data: function() {
          const el = this.element.$;

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
            el.classList.add('button-marketo-event');
            el.setAttribute('data-target', '#wk_modal');
            el.setAttribute('data-toggle', 'modal');
            el.setAttribute('data-form-nid', reference);
          }

          function makeWistiaButton() {
            el.classList.add('wistia_embed');
            el.classList.add('wistia_async_' + reference);
            el.classList.add('popover=true');
            el.classList.add('popoverAnimateThumbnail=true');
            el.classList.add('popoverContent=link');
          }

          function hardReset () {
            el.className = 'wk-cke-button cke_widget_editable cke_widget_element';

            el.removeAttribute('data-target');
            el.removeAttribute('data-toggle');
            el.removeAttribute('data-node-id');
            el.removeAttribute('style');
            el.removeAttribute('target');

            el.setAttribute('href', '/');
          }

          hardReset();

          if (action) {
            el.setAttribute('data-wk-button-action', action);

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
            el.setAttribute('data-wk-button-appearance', appearance);

            switch (appearance) {
              case 'link-arrow':
                el.classList.add('btn-link');
                el.classList.add('fancy-underline');
                el.classList.add('link-arrow');
                break;
              case 'primary':
                el.classList.add('btn');
                el.classList.add('btn-primary');
                break;
              case 'secondary':
                el.classList.add('btn');
                el.classList.add('btn-secondary');
                break;
              case 'tertiary':
                el.classList.add('btn');
                el.classList.add('btn-tertiary');
                break;
              default:
                break;
            }
          }

          if (reference) {
            el.setAttribute('data-wk-button-reference', reference);
          }

          if (text) {
            el.setAttribute('data-wk-button-text', text);
            el.textContent = text;
          }
        },
        dialog: 'wk_button',
        editables: {
          content: {
            selector: '.wk-button'
          }
        },
        init: function() {
          const el = this.element;
          const action = el.getAttribute('data-wk-button-action');
          const appearance = el.getAttribute('data-wk-button-appearance');
          const reference = el.getAttribute('data-wk-button-reference');
          const text = el.getAttribute('data-wk-button-text');

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
        requiredContent: '(wk-cke-button)',
        template: '<a class="wk-cke-button" href="#"></a>',
        upcast: function(element) {
          return (element.name === 'a' || element.name === 'button') &&
            element.hasClass('wk-cke-button');
        },
      });
    },
  });
})();
