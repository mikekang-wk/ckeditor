CKEDITOR.dialog.add('wk_button', function(editor) {
  var config = editor.config;
  var imgPath = CKEDITOR.plugins.getPath('wk_button') + 'img/';
  var minCharacterLength = 1;

  var actionSelect;
  var conditionalInputs = {};
  var additionalFields;

  $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
          currentCategory = "";

      ul[0].classList.add('linkit-ui-autocomplete');

      $.each( items, function( index, item ) {
        var li;

        if ( item.group != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category linkit-result-line--group'>" + item.group + "</li>" );
          currentCategory = item.group;
        }

        li = that._renderItemData( ul, item );

        if ( item.group ) {
          li.attr( "aria-label", item.group + " : " + item.label );
          li.addClass('linkit-result-line');
        }
      });
    }
  });

  function populateMarketoFormIDs() {
    var forms = editor.wkMarketoForms;

    if (!forms) {
      return null;
    }

    var options = [];

    for (var i = 0; i < forms.length; i += 1) {
      options.push([forms[i].title, forms[i].field_marketo_form_id]);
    }

    return options;
  }

  function setUpInput(that, widget) {
    var getEl = that.getElement();
    var el = that.getInputElement().$;
    var id = that.id;

    conditionalInputs[id] = that;

    var currentOption = '';
    var selectedOption = getSelectedOption(actionSelect);

    if (selectedOption === 'link-tab') {
      selectedOption = 'link';
    }

    switch (id) {
      case 'reference':
        currentOption = 'link';
        break;
      case 'form_node_id':
        currentOption = 'form';
        break;
      case 'wistia_video_id':
        currentOption = 'video';
        break;
      default:
        break;
    }

    if (currentOption === selectedOption) {
      window.addLinkitAttributes(el);

      that.setValue(widget.data[id], widget.data[id]);

      getEl.show();
    } else {
      getEl.hide();

      that.setValue(widget.data[id], null);
    }
  }

  function saveValueIfVisible(that, widget) {
    var getEl = that.getElement();

    if (getEl.isVisible()) {
      widget.setData(that.id, that.getValue());

      console.log('saveValueIfVisible', that.id, that.getValue());
    } else {
      widget.setData(that.id, null);
    }
  }

  function validateInput(that) {
    var getEl = that.getElement();
    var getValue = that.getValue();
    var label = that.label;

    if (
      getEl.isVisible() &&
      !getValue
    ) {
      alert(label + ' is a required field.');

      getEl.focus();

      return false;
    }

    return true;
  }

  function clearAdditionalFields() {
    additionalFields = {};
  }

  function hideAllConditionalInputs() {
    for (var key in conditionalInputs) {
      conditionalInputs[key].getElement().hide();
    }
  }

  function getSelectedOption(select) {
    var value = select.options[select.selectedIndex].value;
    return value;
  }

  function handleFormNodeIdChangeEvent() {
    additionalFields['nid'] = window.getNodeId();

    console.log(additionalFields);
  }

  function handleActionChangeEvent() {
    var selectedOption = getSelectedOption(actionSelect);

    hideAllConditionalInputs();
    clearAdditionalFields();

    switch (selectedOption) {
      case 'link':
      case 'link-tab':
        conditionalInputs.reference.getElement().show();
        break;
      case 'form':
        conditionalInputs.form_node_id.getElement().show();
        break;
      case 'video':
        conditionalInputs.wistia_video_id.getElement().show();
        break;
      default:
        break;
    }
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

  function clearReferenceAttributes(input) {
    input.title =  '';
    input.removeAttribute('data-autocomplete-path');

    clearAdditionalFields();
  }

  function autocomplete(el, suggestions) {
    try {
      jQuery(el).catcomplete({
        appendTo: el.parentElement,
        minLength: 0,
        source: suggestions,
        focus: function(event, ui) {
          el.value = ui.item.label;

          return false;
        },
        select: function(event, ui) {
          el.value = ui.item.path;
          el.title =  ui.item.value;

          additionalFields['entity-uuid'] = ui.item.entity_uuid;
          additionalFields['entity-type'] = ui.item.entity_type_id;
          additionalFields['entity-substitution'] = ui.item.substitution_id;

          console.log(additionalFields);

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

    clearReferenceAttributes(input);
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
    description: 'test',
    onShow: function() {
      actionSelect = document.querySelector('select.wk-select-action');
    },
    contents: [{
      id: 'tab1',
      expand: true,
      elements: [
        {
          html: '<p class="wk-dialog-instructions">' +
                  'Use with callout blocks, not in line with text' +
                '</p>',
          id: 'widget_description',
          type: 'html',
          setup: function(widget) {
            clearAdditionalFields();

            additionalFields = widget.data.additional;
          },
          commit: function(widget) {
            widget.setData('additional', additionalFields);
          }
        },
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
          id: 'text',
          type: 'text',
          label: 'Link Text',
          setup: function(widget) {
            this.setValue(widget.data.text);
          },
          commit: function(widget) {
            saveValueIfVisible(this, widget);
          },
          validate: function() {
            return validateInput(this);
          }
        },
        {
          className: 'wk-select-action',
          id: 'action',
          type: 'select',
          label: 'Action',
          'default': 'link',
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
            saveValueIfVisible(this, widget);
          },
        },
        {
          id: 'reference',
          type: 'text',
          label: 'URL',
          setup: function(widget) {
            setUpInput(this, widget);

            this.getInputElement().$.addEventListener(
              'keyup',
              debouncedGetURLOptions,
            );
          },
          commit: function(widget) {
            saveValueIfVisible(this, widget);
          },
          validate: function() {
            return validateInput(this);
          }
        },
        {
          id: 'form_node_id',
          type: 'select',
          label: 'Marketo Form ID',
          'default': 'none',
          items: populateMarketoFormIDs(),
          setup: function(widget) {
            setUpInput(this, widget);

            var el = this.getInputElement().$;

            el.addEventListener(
              'change',
              handleFormNodeIdChangeEvent,
            );
          },
          commit: function(widget) {
            saveValueIfVisible(this, widget);
          },
          validate: function() {
            return validateInput(this);
          }
        },
        {
          id: 'wistia_video_id',
          type: 'text',
          label: 'Wistia Video ID',
          setup: function(widget) {
            setUpInput(this, widget);
          },
          commit: function(widget) {
            saveValueIfVisible(this, widget);
          },
          validate: function() {
            return validateInput(this);
          }
        },
      ]
    }],
  };
});
