CKEDITOR.dialog.add( 'icomoon-dialog', function(editor) {
  var config = editor.config,
    images = editor.icomoon,
    i;

  var dialog;

  function insertElemToWYSI(el){
    var target = el.getChild(0);
    var title = target.getAttribute( 'title' );

    var img = editor.document.createElement( 'i', {
      attributes: {
        class: title,
        title: title,
      }
    });

    editor.insertElement( img );

    dialog.hide();
  }

  var onClick = function(evt) {
    var target = evt.data.getTarget(),
        targetName = target.getName();

    if (targetName == 'button') {
      insertElemToWYSI(target);
    }
  };

  function clearFilterText() {
    const searchInput = document.getElementById('icomoon-search-input');

    searchInput.value = '';
    filterIcons('');
  }

  function filterIcons(text) {
    var re = new RegExp(text, 'ig');
    var icons = document.querySelectorAll('#cke-dialog-icomoon-list i');
    var iconsArray = [].slice.call(icons);

    for (let i = 0; i < iconsArray.length; i += 1) {
      const classString = iconsArray[i].getAttribute('class');

      if (classString.match(re)) {
        iconsArray[i].parentElement.setAttribute("style", "display: flex;");
      } else {
        iconsArray[i].parentElement.setAttribute("style", "display: none;");
      }
    }
  }

  document.addEventListener('keyup', function(e) {
    if (e.target.getAttribute('id') === 'icomoon-search-input') {
      filterIcons(e.target.value);
    }
  });

  var labelId = CKEDITOR.tools.getNextId() + '_smiley_emtions_label';
  var html = [
    '<div>',
    '<label class="icomoon-search-label">Search for Icons <input id="icomoon-search-input" class="icomoon-search-input" type="search" /></label>',
    '<ul id="cke-dialog-icomoon-list" class="cke-dialog-icomoon-list">',
  ];

  var size = images.length;

  for (i = 0; i < size; i+= 1) {
    var smileyLabelId = 'cke_smile_label_' + i + '_' + CKEDITOR.tools.getNextNumber();
    let iconName = "icon-";

    iconName += images[i].properties.name.split(',')[0].replace(/\s/g, '-').trim();

    html.push(
      '<li>' +
      '<button type="button" aria-labelledby="' + smileyLabelId + '">',
      '<i class="cke_hand ' + iconName + '" title="'+ iconName +'" style=""></i>' +
      '<span>' + iconName + '</span>' +
      '</button>', '</li>'
    );
  }

  html.push( '</ul></div>' );

  var iconSelector = {
    type: 'html',
    id: 'iconSelector',
    html: html.join( '' ),
    onLoad: function( event ) {
      dialog = event.sender;
    },
    focus: function() {
      var self = this;
      // IE need a while to move the focus (https://dev.ckeditor.com/ticket/6539).
      setTimeout( function() {
        var searchInput = self.getElement().$.querySelector('#icomoon-search-input');

        clearFilterText();
        searchInput.focus();
      }, 0);
    },
    onClick: onClick,
  };

  return {
    title: 'Choose an icon to insert',
    contents: [ {
      id: 'tab1',
      label: '',
      title: '',
      expand: true,
      padding: 0,
      elements: [
        iconSelector
      ]
    }],
    buttons: [ CKEDITOR.dialog.cancelButton ]
  };
});
