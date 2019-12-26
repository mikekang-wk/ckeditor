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

//  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

  // Dialog windows are also simplified.
  config.removeDialogTabs = 'link:advanced';

  var pluginsArray = [
    'icomoon',
    'call_to_action',
    'htmlwriter',
    'autogrow',
    'sourcearea',
    'showblocks',
    'find',
    'table',
    'pastetext',
    'removeformat',
  ];

  config.extraPlugins = pluginsArray.join(",");

  config.skin = 'bootstrapck';

  /*
    Paste as plain text plugin
  */
  config.forcePasteAsPlainText = true;
//  config.forcePasteAsPlainText = 'allow-word';
  config.allowedContent = true;
};
