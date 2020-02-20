CKEDITOR.dialog.add('wk_button', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_button') + 'img/';
  var minCharacterLength = 3;

  var conditionalInputs = {};

  function handleActionChangeEvent() {
    var select = event.target;
    var value = select.options[select.selectedIndex].value;

    console.log(value, conditionalInputs);
  }

  function debounce(fn, duration) {
    var timer;

    return function() {
      var context = this,
          args = arguments;

      var func = fn.bind(context, args[0]);

      window.clearTimeout(timer);
      timer = window.setTimeout(func, duration);
    }
  }

  function autocomplete(el, suggestions) {
    try {
      jQuery(el).autocomplete({
        appendTo: el.parentElement,
        minLength: minCharacterLength,
        source: suggestions,
        focus: function(event, ui) {
          el.value = ui.item.label;
          return false;
        },
        select: function(event, ui) {
          // this is where we modify hidden field values
          // input.value = ( ui.item.label );
          // input.value = ( ui.item.value );
          return false;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  function getURLOptions() {
    var event = arguments[0];

    if (!event) {
      return;
    }

    var input = event.target;
    var text = input.value;

    if (text.length < minCharacterLength) {
      return;
    }

    var suggestions = [
      {
        "label": " Migration to new SOX technology picks up pace, report says",
        "path": "/node/2512",
        "group": "Content - News",
        "description": "",
        "entity_uuid": "7268ce9d-f351-4aaf-82ee-e2a86fce5f9f",
        "entity_type_id": "node",
        "substitution_id": "canonical"
      },
      {
        "label": " SOX Compliance Using Less Resources",
        "path": "/node/1175",
        "group": "Content - Thought Leadership",
        "description": "",
        "entity_uuid": "19dade5f-2c60-4372-b0be-e7205c0c458c",
        "entity_type_id": "node",
        "substitution_id": "canonical"
      },
      {
        "label": "12 things to look for when choosing a SOX or internal controls solution",
        "path": "/node/1264",
        "group": "Content - Thought Leadership",
        "description": "",
        "entity_uuid": "8e3e84d6-2b8d-4c52-ac99-4e8be330f5cd",
        "entity_type_id": "node",
        "substitution_id": "canonical"
      },
      {
        "label": "Buyer&#039;s Guide: SOX Software Purchasing Checklist",
        "path": "/node/1106",
        "group": "Content - Thought Leadership",
        "description": "",
        "entity_uuid": "62f4989f-333d-4cbf-b8d7-676c63436e4d",
        "entity_type_id": "node",
        "substitution_id": "canonical"
      },
      {
        "label": "Buyer&#039;s Guide: SOX Software Purchasing Checklist",
        "path": "/node/2921",
        "group": "Content - Campaign Landing",
        "description": "",
        "entity_uuid": "8dd39d7c-d92a-4de4-8068-3987ace06f1c",
        "entity_type_id": "node",
        "substitution_id": "canonical"
      },
    ];

    autocomplete(input, suggestions);

//    var ajax = (function() {
//      var endpoint = 'https://www.workiva.com/linkit/autocomplete/cln?q=';
//      endpoint += text;
//
//      var xhr = new XMLHttpRequest();
//
//      xhr.onload = function () {
//        if (xhr.status >= 200 && xhr.status < 300) {
//          var response = JSON.parse(xhr.responseText);
//          var suggestions = response.suggestions;
//
//          try {
//            autocomplete(input, suggestions);
//          } catch(e) {
//            console.log(e);
//          }
//        } else {
//          console.log('XHR request failed');
//        }
//      };
//
//      xhr.open('GET', endpoint);
//      xhr.send();
//    })();
  }

  var debouncedGetURLOptions = debounce(getURLOptions, 500);

  function getActionOptions() {
    var linkArrowPath = imgPath + 'link-arrow.jpg';
    var primaryButtonPath = imgPath + 'primary-button.jpg';
    var secondaryButtonPath = imgPath + 'secondary-button.jpg';
    var tertiaryButtonPath = imgPath + 'tertiary-button.jpg';

    var arr = [
      ['<img src="' + linkArrowPath + '" title="link-arrow" />', 'link-arrow'],
      ['<img src="' + primaryButtonPath + '" title="primary-button" />', 'primary'],
      ['<img src="' + secondaryButtonPath + '" title="secondary-button" />', 'secondary'],
      ['<img src="' + tertiaryButtonPath + '" title="tertiary-button" />', 'tertiary'],
    ];

    return arr;
  }

  return {
    title: 'Call to Action Options',
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          className: 'wk-display-block',
          id: 'appearance',
          type: 'radio',
          label: 'Appearance',
          items: getActionOptions(),
          setup: function(widget) {
              this.setValue(widget.data.appearance);
          },
          commit: function(widget) {
              widget.setData('appearance', this.getValue());
          },
        },
        {
          id: 'action',
          type: 'select',
          label: 'Action',
          items: [
            ['Link to another page', 'link'],
            ['Link to another page in a new tab', 'link-tab'],
            ['Open a Marketo form in a modal', 'form'],
            ['Play a video in a modal', 'video'],
          ],
          setup: function(widget) {
            this.setValue(widget.data.action);

            var el = this.getInputElement().$;

            el.addEventListener(
              'change',
              handleActionChangeEvent,
            );
          },
          commit: function(widget) {
              widget.setData('action', this.getValue());
          },
        },
        {
          id: 'reference',
          type: 'text',
          label: 'URL',
          setup: function(widget) {
            this.setValue(widget.data.reference);

            conditionalInputs.reference = this;

            var el = this.getInputElement().$;

            window.addLinkitAttributes(el);

            el.addEventListener(
              'keyup',
              debouncedGetURLOptions,
            );
          },
          commit: function(widget) {
              widget.setData('reference', this.getValue());
          },
          validate: function() {
            if(!this.getValue()) {
                alert('All fields are required');
                return false;
            }
          },
        },
        {
          id: 'form_node_id',
          type: 'text',
          label: 'Marketo Form ID',
          setup: function(widget) {
            this.setValue(widget.data.reference);

            var el = this.getInputElement().$;

            conditionalInputs.form_node_id = this;

            window.addLinkitAttributes(el);

          },
          commit: function(widget) {
              widget.setData('marketo_form_id', this.getValue());
          },
        },
        {
          id: 'text',
          type: 'text',
          label: 'Text',
          setup: function(widget) {
              this.setValue(widget.data.text);
          },
          commit: function(widget) {
              widget.setData('text', this.getValue());
          },
          validate: function() {
            if(!this.getValue()) {
                alert('All fields are required');
                return false;
            }
          },
        },
      ]
    }],
  };
});
