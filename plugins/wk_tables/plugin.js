(function() {
  CKEDITOR.plugins.add('wk_tables', {
    requires: 'widget',
    icons: 'wk_tables',
    init: function(editor) {
      CKEDITOR.dialog.add('wk_tables', this.path + 'dialogs/dialog.js');

      editor.tableData = {
        maxColumns: 26,
        maxRows: 100,
        getData: function(arr){
//          this.data
// get all the cells
//        '.wk-cke-celldata'
// feed into array
// return an array of objects
//          {
//            id: 'a1',
//            data: 'value',
//          },
        },
        data: [
          {
            id: 'a1',
            data: 'value',
          },
          {
            id: 'a2',
            data: 'value',
          },
          {
            id: 'b1',
            data: 'value',
          },
          {
            id: 'b2',
            data: 'value',
          },
        ],
        sortedData: {
//        rowA: [
//          {},
//        ],
        },
        letters: [
          'a','b','c','d','e','f','g','h','i',
          'j','k','l','m','n','o','p','q','r',
          's','t','u','v','w','x','y','z',
        ],
        sortDataIntoColumns: function() {
          var data = this.data;
          var sortedData = this.sortedData;

          for (var i = 0; i < data.length; i += 1) {
            var letter = data[i].id.charAt(0);
            var rowName = 'row_' + letter;

            if (!sortedData.hasOwnProperty(rowName)) {
              sortedData[rowName] = [];
            }

            if (sortedData[rowName].indexOf(data[i]) === -1) {
             sortedData[rowName].push(data[i]);
            }
          }

          return sortedData;
        },
        buildRow: function(rowData){
          var html = '';

          html += '<tr>';

          for (var i = 0; i < rowData.length; i += 1) {
            html += this.buildCell(rowData[i]);
          }

          html += '</tr>';

          return html;
        },
        buildCell: function(cell) {
          var html = '';

          html += '<td>';
          html +=   '<div class="wk-cke-celldata ' + cell.id + '">';
          html +=     cell.data;
          html +=   '</div>';
          html += '</td>';

          return html;
        },
        setEditableCells: function() {
          var o = {};
          var cols = this.maxColumns;
          var rows = this.maxRows;

          for (var i = 0; i < cols; i += 1) {
            for (var j = 0; j < rows; j += 1) {
              var name = this.letters[i];
              name += String(j + 1);

              o[name] = {
                selector: '.' + name,
              };
            }
          }
console.log(o);
          return o;
        },
        getDataFromEditor: function() {
          // scrape our object for new data?
        },
        initTableData: function() {
          // do we need to do this?
        },
        populateTableOptions: function(num) {
          var options = [];

          for (var i = 1; i < num; i +=1) {
            (function(index){
              var option = [i, i];

              options.push(option);
            })(i);
          }
          return options;
        },
      };

      editor.widgets.add('wk_tables', {
        button: 'Tables',
        dialog: 'wk_tables',
        template:
          '<table class="wk-cke-table">' +
            '<tbody>' +
             '</tbody>' +
          '</table>',
        editables: {},
        requiredContent: 'table(!wk-cke-table)',
        upcast: function(element) {
          return (
            element.name === 'table' &&
            element.hasClass('wk-cke-table')
          );
        },
        init: function() {
          console.log('init', this);

//          const el = this.element;
//
//          if (el.hasClass('align-items-center')){
//            this.setData('alignment', 'center');
//          }
//          const el = this.element;
        },
        data: function() {
          console.log("data", this);

          this.editables = editor.tableData.setEditableCells();

          const el = this.element;
          const tBody = el.$.childNodes[0];

          console.log(this, el);

          editor.tableData.getData();
          editor.tableData.sortDataIntoColumns();

          var html = '';
          var data = editor.tableData.sortedData;
          var keys = Object.keys(data);

          for (var i = 0; i < keys.length; i += 1) {
            html += editor.tableData.buildRow(data[keys[i]]);
          }

          tBody.innerHTML = html;

          console.log('data', el, tBody);
        },
      });
    },
  });
})();
