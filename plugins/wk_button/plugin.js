(function() {
  CKEDITOR.plugins.add('wk_button', {
    requires: 'widget',
    icons: 'wk_button',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_button', this.path + 'dialogs/dialog.js');

      editor.ui.addButton('wk_button', {
        label: 'Button',
        command: 'wk_button',
        icon: this.path + 'icons/wk_button.png'
      });

      function hardReset (el) {
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
          'button-action',
          'button-appearance',
          'button-reference',
          'button-text',
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
//          el.data(dataAtts[i], false);
          el.removeAttribute('data-' + dataAtts[i]);
        }

        el.removeAttribute('style');
        el.removeAttribute('target');
        el.removeAttribute('id');
        el.setAttribute('href', '#');
      }

      editor.widgets.add('wk_button', {
        editables: {},
        requiredContent: '(wk-cke-button)',
        template: '<a class="wk-cke-button"></a>',
        upcast: function(element) {
          return (
            element.name === 'a' &&
            element.hasClass('wk-cke-button')
          );
        },
        dialog: 'wk_button',
        init: function() {
          const el = this.element;
          const action = el.getAttribute('data-button-action');
          const appearance = el.getAttribute('data-button-appearance');
          const reference = el.getAttribute('data-button-reference');
          const text = el.getAttribute('data-button-text');

          const entitySubstitution = el.getAttribute('data-entity-substitution');
          const entityType = el.getAttribute('data-entity-type');
          const entityUUID = el.getAttribute('data-entity-uuid');

          const videoId = el.getAttribute('data-button-video-id');

          const formNodeId = el.getAttribute('data-form-nid');
          const nodeId = el.getAttribute('data-nid');

          const additionalFields = {};

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

          if (videoId) {
            this.setData('wistia_video_id', videoId);
          }

          if (formNodeId) {
            this.setData('form_node_id', formNodeId);
          }

          if (text) {
            this.setData('text', text);
          }

          if (entitySubstitution) {
            additionalFields['entity-substitution'] = entitySubstitution;
          }

          if (entityType) {
            additionalFields['entity-type'] = entityType;
          }

          if (entityUUID) {
            additionalFields['entity-uuid'] = entityUUID;
          }

          if (nodeId) {
            additionalFields['nid'] = nodeId;
          }

          this.setData('additional', additionalFields);
        },
        data: function() {
          const el = this.element;

          const appearance = this.data.appearance;
          const text = this.data.text;
          const action = this.data.action;
          const reference = this.data.reference;
          const videoId = this.data.wistia_video_id;
          const formNodeId = this.data.form_node_id;
          const additional = this.data.additional;

          hardReset(el);

          if (action) {
            el.data('button-action', action);

            switch (action) {
              case 'link':
              case 'link-tab':
                el.setAttribute('href', reference);
                el.setAttribute('target', '_blank');

                // fix bug in CK4 around changing href
                el.removeAttribute('_cke_saved_href');
                el.$.removeAttribute('data-cke-saved-href');

                if (additional) {
                  const entitySubstitution = additional['entity-substitution'];
                  const entityType = additional['entity-type'];
                  const entityUUID= additional['entity-uuid'];

                  el.data('entity-substitution', entitySubstitution);
                  el.data('entity-type', entityType);
                  el.data('entity-uuid', entityUUID);
                }

                break;
              case 'form':
                el.addClass('button-marketo-event');
                el.data('target', '#wk_modal');
                el.data('toggle', 'modal');
                el.data('form-nid', formNodeId);

                if (additional) {
                  const nodeId = additional['nid'];

                  el.data('nid', nodeId);
                }

                break;
              case 'video':
                el.addClass('wistia_embed');
                el.addClass('popover=true');
                el.addClass('popoverAnimateThumbnail=true');
                el.addClass('popoverContent=link');

                if (videoId) {
                  el.addClass('wistia_async_' + videoId);
                  el.setAttribute('id', 'wistia-' + videoId);
                }

                break;
              default:
                break;
            };
          }

          if (videoId) {
            el.data('button-video-id', videoId);
          }

          if (appearance) {
            el.data('button-appearance', appearance);

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
            el.data('button-reference', reference);
          }

          if (text) {
            el.data('button-text', text);
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
