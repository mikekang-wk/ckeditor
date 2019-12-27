(function () {
  CKEDITOR.plugins.add('wk_button', {
    requires: 'widget',
    icons: 'wk_button',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_button', this.path + 'dialogs/wk_button.js');

      CKEDITOR.dtd.$editable['a'] = 1;
      CKEDITOR.dtd.$editable['button'] = 1;

      editor.widgets.add('wk_button', {
        button: 'Create a call to action',
        data: function() {
          const el = this.element.$;
          const action = this.data.action;
          const appearance = this.data.appearance;
          const reference = this.data.reference;

          function makeLink(){
            el.setAttribute('href', reference);
          }

          function makeLinkTab(){
            el.setAttribute('href', reference);
            el.setAttribute('target', '_blank');
          }

          function makeMarketoButton() {
            el.classList.add('button-marketo-event');
            el.setAttribute('data-target', '#wk_modal');
            el.setAttribute('data-toggle', 'modal');
            el.setAttribute('data-node-id', reference);
          }

          function makeWistiaButton() {
            el.classList.add('wistia_embed');
            el.classList.add('wistia_async_' + reference);
            el.classList.add('popover=true');
            el.classList.add('popoverAnimateThumbnail=true');
            el.classList.add('popoverContent=link');
          }

          function hardReset () {
            el.className = 'wk-button cke_widget_editable cke_widget_element';

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
                cta = makeLink();
                break;
              case 'link-tab':
                cta = makeLinkTab();
                break;
              case 'form':
                cta = makeMarketoButton();
                break;
              case 'video':
                cta = makeWistiaButton();
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

          if (action) {
            this.setData('action', action);
          }

          if (appearance) {
            this.setData('appearance', appearance);
          }

          if (reference) {
            this.setData('reference', reference);
          }
        },
        requiredContent: '(wk-button)',
        template: '<a class="wk-button" href="#">Call to Action</a>',
        upcast: function(element) {
          return (element.name === 'a' || element.name === 'button') &&
            element.hasClass('wk-button');
        },
      });
    },
  });
})();
