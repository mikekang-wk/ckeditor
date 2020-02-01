(function() {
  const wk_plugin_name = 'wk_button';

  CKEDITOR.plugins.add(wk_plugin_name, {
    requires: 'widget',
    icons: wk_plugin_name,
    init: function(editor) {
      CKEDITOR.dialog.add(wk_plugin_name, this.path + 'dialogs/dialog.js');

      editor.widgets.add(wk_plugin_name, {
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
            el.setAttribute('data-wk-cke-button-action', action);

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
            el.setAttribute('data-wk-cke-button-appearance', appearance);

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
            el.setAttribute('data-wk-cke-button-reference', reference);
          }

          if (text) {
            el.setAttribute('data-wk-cke-button-text', text);
            el.textContent = text;
          }
        },
        dialog: wk_plugin_name,
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
