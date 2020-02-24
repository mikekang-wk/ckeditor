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
          } else {
            this.setData('action', 'link');
          }

          if (appearance) {
            this.setData('appearance', appearance);
          } else {
            this.setData('appearance', 'link-arrow');
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

          function hardReset () {
            var ckeClasses = el.getAttribute('class');
            var dataAtts = [
              'target',
              'toggle',
              'node-id',
              'form-nid',
              'target',
              'toggle',
              'entity-substitution',
              'entity-type',
              'entity-uuid',
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
                el.setAttribute('href', reference);

// if the data is not empty?
//el.data('entity-substitution', canonical);
//el.data('entity-type', node);
//el.data('entity-uuid', 72f47db7-ff70-4fc1-afcd-35337d65ffc6);

                break;
              case 'link-tab':
                el.setAttribute('href', reference);
                el.setAttribute('target', '_blank');
//<a
//  data-entity-substitution="canonical"
//  data-entity-type="node"
//  data-entity-uuid="72f47db7-ff70-4fc1-afcd-35337d65ffc6" href="/node/1612"
//>
                break;
              case 'form':
//                console.log(window.getNodeId);
                el.addClass('button-marketo-event');
                el.setAttribute('data-target', '#wk_modal');
                el.setAttribute('data-toggle', 'modal');
//              el.setAttribute('data-form-nid', reference);

//<a
//  href="/events/amplify-local-new-york-city"
//  class="btn btn-primary button-marketo-event"
//  data-target="#wk_modal"
//  data-toggle="modal"
//  data-form-nid="4120"
//  data-nid="3722" // still need to do this step!
//>
                break;
              case 'video':
                el.addClass('wistia_embed');
                el.addClass('wistia_async_' + reference);
                el.addClass('popover=true');
                el.addClass('popoverAnimateThumbnail=true');
                el.addClass('popoverContent=link');
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

      var marketoAJAX = function(){
        var endpoint = '/api/marketo-form-list?_format=hal_json';
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);

//            editor.wkMarketoForms = response;
            console.log('json', xhr.responseText, editor.wkMarketoForms);
          } else {
            console.log('XHR request failed');
          }
        };

        xhr.open('GET', endpoint);
        xhr.send();
      };

//    marketoAJAX();
      editor.wkMarketoForms = [
        {
          "title": "Event - Amplify Local - FIN Rep. Only",
          "field_marketo_form_id": "4977",
          "nid": "4173",
          "field_marketo_form_success_event": "mktoEvent"
        },
        {
          "title": "Event - Amplify Local - FIN &amp; SOX",
          "field_marketo_form_id": "4981",
          "nid": "4120",
          "field_marketo_form_success_event": "mktoEvent"
        },
        {
          "title": "Event - Webinar - NO CPE",
          "field_marketo_form_id": "5024",
          "nid": "4108",
          "field_marketo_form_success_event": "mktoEvent"
        },
      ];
    },
  });
})();
