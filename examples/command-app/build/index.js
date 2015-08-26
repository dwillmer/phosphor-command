/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/*import {
  DockArea, DockMode, Tab, Widget,
  Menu, MenuBar, MenuItem
} from phosphor.widgets;*/
var DockArea = phosphor.widgets.DockArea;
var DockMode = phosphor.widgets.DockMode;
var Tab = phosphor.widgets.Tab;
var Widget = phosphor.widgets.Widget;
var Menu = phosphor.widgets.Menu;
var MenuBar = phosphor.widgets.MenuBar;
var MenuItem = phosphor.widgets.MenuItem;
var addCodeMirrorItem = new MenuItem({
    text: "New Code Panel",
    shortcut: "Ctrl-N"
});
var newItem = new MenuItem({
    text: "New",
    submenu: new Menu([
        addCodeMirrorItem,
    ]),
});
function main() {
    var menubar = new MenuBar([
        newItem
    ]);
    menubar.attach(document.getElementById('container'));
}
window.onload = main;
//# sourceMappingURL=index.js.map