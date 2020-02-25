(function() {
  CKEDITOR.plugins.add('wk_content_swap', {
    requires: 'widget',
    icons: 'wk_content_swap',
    init: function(editor) {
      function getUniqueId() {
        // best way to get/make/maintain unique IDs
        // across site? AJAX query to a DB

        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }

        var id = getRandomInt(999);

        return id;
      }

      editor.widgets.add('wk_content_swap', {
        button: 'SmartLing Content Swap',
        editables: {
          content: {
            selector: '.SL_swap',
          }
        },
        requiredContent: '(SL_swap)',
        template: '<div class="SL_swap">' +
                  '</div>',
        upcast: function(element) {
          return (
            element.name === 'div' &&
            element.hasClass('SL_swap')
          );
        },
        init: function() {
          const el = this.element;
          const id = el.getAttribute('id');

          if (id) {
            this.setData('id', id);
          }
        },
        data: function() {
          const el = this.element;
          const id = this.data.id || getUniqueId();

          if (id) {
            el.setAttribute('id', id);
          }
        },
      });
    },
  });
})();
