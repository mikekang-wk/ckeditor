CKEDITOR.editorConfig = function( config ) {
  config.toolbarGroups = [
    { name: 'document',     groups: [ 'mode', 'document', 'doctools' ] },
//    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
//    { name: 'forms' },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
//    { name: 'links' },
//    { name: 'styles' },
//    { name: 'colors' },
    { name: 'tools' },
    { name: 'insert' },
    { name: 'others' },
  ];
  // Dialog windows are also simplified.
  config.removeDialogTabs = 'link:advanced';
  //  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
  config.skin = 'bootstrapck';
  config.forcePasteAsPlainText = true;
//  config.forcePasteAsPlainText = 'allow-word';
  config.allowedContent = true;

  var pluginsArray = [
    'widget',
    'htmlwriter',
    'autogrow',
    'sourcearea',
    'showblocks',
    'find',
    'table',
    'pastetext',
    'removeformat',
    'lineutils',
    'widgetselection',
    //
    'wk_button',
//    'icomoon',
    'call_to_action',
  ];

  config.extraPlugins = pluginsArray.join(",");
};
