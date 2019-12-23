CKEDITOR.dialog.add('cta-dialog', function(editor) {
  var ctaData = {};

  var actionOptions = [
    {
      value: 'link',
      text: 'Link to another page',
    },
    {
      value: 'link-tab',
      text: 'Link to another page in a new tab',
    },
    {
      value: 'form',
      text: 'Open a Marketo form in a modal',
    },
    {
      value: 'video',
      text: 'Play a video in a modal',
    },
  ];

  var appearanceOptions = [
    {
      value: 'link-arrow',
      text: 'Link Arrow',
    },
    {
      value: 'primary',
      text: 'Primary Button',
    },
    {
      value: 'secondary',
      text: 'Secondary Button',
    },
    {
      value: 'tertiary',
      text: 'Tertiary Button',
    },
  ];

  function showMarketoFields(){
    var fieldCollection = document.querySelectorAll('#cta-form [data-marketo-field]');
    var fieldArray = [].slice.call(fieldCollection);

    for (let i = 0; i < fieldArray.length; i += 1) {
      fieldArray[i].style.display = 'block';
    }
  }

  function hideMarketoFields(){
    var fieldCollection = document.querySelectorAll('#cta-form [data-marketo-field]');
    var fieldArray = [].slice.call(fieldCollection);

    for (let i = 0; i < fieldArray.length; i += 1) {
      fieldArray[i].style.display = 'none';
    }
  }

  function createCtaFromCtaData() {
    var cta;

    function addAppearanceClasses(el) {
      switch (ctaData.appearance) {
        case "link-arrow":
          el.classList.add("btn-link");
          el.classList.add("fancy-underline");
          el.classList.add("link-arrow");
          break;
        case "primary":
          el.classList.add("btn");
          el.classList.add("btn-primary");
          break;
        case "secondary":
          el.classList.add("btn");
          el.classList.add("btn-secondary");
          break;
        case "tertiary":
          el.classList.add("btn");
          el.classList.add("btn-tertiary");
          break;
        default:
          break;
      }
    }

    function makeAnchor(){
      var el = new CKEDITOR.dom.element('a');

      el.$.textContent = ctaData.text;
      el.$.setAttribute('href', ctaData.reference);

      addAppearanceClasses(el.$);

      return el;
    }

    function makeMarketoButton() {
      var el = new CKEDITOR.dom.element('button');

      el.$.classList.add('button-marketo-event');

      el.$.setAttribute('data-target', '#wk_modal');
      el.$.setAttribute('data-toggle', 'modal');
      el.$.setAttribute('type', 'button');

      el.$.setAttribute('data-node-id', ctaData.reference);

      el.$.textContent = ctaData.text;

      addAppearanceClasses(el.$);

      return el;
    }

    function makeWistiaButton() {
      var el = new CKEDITOR.dom.element('div');
      var btn = new CKEDITOR.dom.element('button');
      var wistiaId = 'wistia_async_' + ctaData.reference;

      el.$.classList.add('wistia_embed');
      el.$.classList.add(wistiaId);

      el.$.classList.add('popover=true');
      el.$.classList.add('popoverAnimateThumbnail=true');
      el.$.classList.add('popoverContent=link');

      el.$.setAttribute('style', 'display:inline-block;');

      btn.$.setAttribute('type', 'button');
      btn.$.textContent = ctaData.text;

      addAppearanceClasses(btn.$);

      el.append(btn);

      return el;
    }

    switch (ctaData.action) {
      case 'link':
        cta = makeAnchor();
        break;
      case 'link-tab':
        cta = makeAnchor();
        cta.$.setAttribute('target', '_blank');
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

    return {
      cta: cta
    }
  }

  function fetchMarketoIDs() {

  }

  function handleActionChange(e) {
    var select = e.target;
    var selectedValue = select.options[select.selectedIndex].value;

    if (selectedValue === 'form') {
      showMarketoFields();
    } else {
      hideMarketoFields();
    }
  }

  function resetFields() {
    var selectCollection = document.querySelectorAll('#cta-form select');
    var selectArray = [].slice.call(selectCollection);

    var inputsCollection = document.querySelectorAll('#cta-form input');
    var inputArray = [].slice.call(inputsCollection);

    for (let i = 0; i < selectArray.length; i += 1) {
      selectArray[i].selectedIndex = 0;
    }

    for (let i = 0; i < inputArray.length; i += 1) {
      inputArray[i].value = '';
    }

    hideMarketoFields();
  }

  function clearData() {
    for (var key in ctaData) {
      if (ctaData.hasOwnProperty(key)) {
          ctaData[key] = '';
      }
    }
  }

  function updateCtaData() {
    var fieldCollection = document.querySelectorAll('#cta-form [data-cta]');
    var fieldArray = [].slice.call(fieldCollection);

    for (let i = 0; i < fieldArray.length; i += 1) {
      const key = fieldArray[i].getAttribute('data-cta');

      if (fieldArray[i].tagName === 'SELECT') {
        ctaData[key] = fieldArray[i].options[fieldArray[i].selectedIndex].value;
      }

      if (fieldArray[i].tagName === 'INPUT' && fieldArray[i].type === 'text') {
        ctaData[key] = fieldArray[i].value;
      }
    }
  }

  function buildFormHTML() {
    var frag = document.createDocumentFragment();

    var formWrapper = document.createElement('div');

    var inputReference = document.createElement('input');
    var inputText = document.createElement('input');

    var labelAction = document.createElement('label');
    var labelReference = document.createElement('label');
    var labelAppearance = document.createElement('label');
    var labelText = document.createElement('label');

    var selectAction = document.createElement('select');
    var selectAppearance = document.createElement('select');

    selectAction.setAttribute('id', 'cta-select-action');
    selectAction.setAttribute('data-cta', 'action');

    for (let i = 0; i < actionOptions.length; i += 1) {
      selectAction.options[selectAction.options.length] = new Option(actionOptions[i].text, actionOptions[i].value);
    }

    selectAppearance.setAttribute('id', 'cta-select-appearance');
    selectAppearance.setAttribute('data-cta', 'appearance');

    for (let i = 0; i < appearanceOptions.length; i += 1) {
      selectAppearance.options[selectAppearance.options.length] = new Option(appearanceOptions[i].text, appearanceOptions[i].value);
    }

    formWrapper.setAttribute('id', 'cta-form');

    inputReference.setAttribute('id', 'cta-input-reference');
    inputReference.setAttribute('type', 'text');
    inputReference.setAttribute('data-cta', 'reference');

    inputText.setAttribute('id', 'cta-input-text');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('data-cta', 'text');

    labelAction.textContent = "Choose Action";
    labelReference.textContent = "URL or Node ID";
    labelAppearance.textContent = "Appearance";
    labelText.textContent = "Display Text";

    labelReference.appendChild(inputReference);
    labelAction.appendChild(selectAction);
    labelAppearance.appendChild(selectAppearance);
    labelText.appendChild(inputText);

    formWrapper.appendChild(labelAction);
    formWrapper.appendChild(labelReference);
    formWrapper.appendChild(labelAppearance);
    formWrapper.appendChild(labelText);

    frag.appendChild(formWrapper);

    return frag;
  }

  document.addEventListener("change", function(e) {
    if (e.target.getAttribute('id') === 'cta-select-action') {
      handleActionChange(e);
    }
  });

  var ctaForm = {
    type: 'html',
    id: 'cta-form',
    html: '<div><div id="cta-dialog-append-content"></div></div>',
    onLoad: function( event ) {
      var appendDiv = document.getElementById('cta-dialog-append-content');
      var formHTML = buildFormHTML();

      dialog = event.sender;

      appendDiv.appendChild(formHTML);
    },
    focus: function() {
      var self = this;
      setTimeout( function() {
        var focusThis = self.getElement().$.querySelector('#cta-select-action');

        resetFields();
        focusThis.focus();
      }, 0);
    },
  };

  return {
    title: 'Create a call to action',
    contents: [ {
      id: 'tab1',
      label: '',
      title: '',
      expand: true,
      padding: 0,
      elements: [
        ctaForm
      ]
    }],
    onOk: function() {
      var dialog = this;
      var cta;

      updateCtaData();
      cta = createCtaFromCtaData().cta;

      if (cta) {
        editor.insertElement(cta);
      }
    }
  };
});
