
        var yugi = {
            col: 5,
            addRow: function(table) {
                var vals = ["自动生成", b.value, "<a href='###' class='edit' onclick='yugi.modify(table,this)'>修改</a>"," <a href='###' class='delete' onclick='yugi.del(table,this)'>删除</a>"," <a href='know.html'class='edit'>编辑知识点</a>"];
                var tr = table.insertRow(table.tBodies[0].rows.length);
                for (var i = 0; i < yugi.col; i++) {
                    var td = tr.insertCell(tr.cells.length);
                    td.innerHTML = vals[i];
                }
            },
            modify: function(table, row) {
                var r = row.parentElement.parentElement,
                    c = r.cells;
                if (/.*修改.*/g.test(row.innerHTML)) {
                    for (var i = 1; i < c.length - 3; i++) {
                        var ci = c[i];
                        var txt = document.createElement("input");
                        txt.type = "text";
                        txt.style="width:50px;"
                        txt.value = ci.innerHTML;
                       ci.innerHTML = "";
                        ci.appendChild(txt);
                    }
                    row.innerHTML = "保存";
                } else {
                    for (var i = 1; i < c.length - 3; i++) {
                        var ci = c[i];
                        ci.innerHTML = ci.children[0].value;
                    }
                    row.innerHTML = "修改";
                }
            },
            del: function(table, row) {
                var ind = row.parentElement.parentElement.rowIndex;
                table.tBodies[0].deleteRow(ind-1);
            }
        }
