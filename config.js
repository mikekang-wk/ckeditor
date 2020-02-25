CKEDITOR.editorConfig = function( config ) {
  config.toolbarGroups = [
    {
      name: 'document',
      groups: [ 'mode', 'document', 'doctools' ],
    },
    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
    { name: 'forms' },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    { name: 'links' },
    { name: 'styles' },
    { name: 'colors' },
    { name: 'tools' },
    { name: 'insert' },
    { name: 'others' },
  ];

  config.removeDialogTabs = 'link:advanced';
  //  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
  config.skin = 'bootstrapck';
  config.forcePasteAsPlainText = true;
//  config.forcePasteAsPlainText = 'allow-word';
  config.allowedContent = true;

//  config.contentsCss = [
//    'css/samples.css',
//  ];

  var pluginsArray = [
    'dialog',
    'widget',
    'widgetselection',
    'sourcearea',
    'htmlwriter',
    'showblocks',
//    'autogrow',
//    'find',
//    'table',
//    'pastetext',
//    'removeformat',
//    'lineutils',
    'wk_cke_dialog_styles',
    'wk_percentage',
    'wk_card',
    'wk_teaser',
    'wk_button',
    'wk_icons',
    'wk_two_column_builder',
    'wk_three_column_builder',
    'wk_content_swap',
//  'wk_image_stack',
  ];

  config.extraPlugins = pluginsArray.join(",");
};
