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

import DockArea = phosphor.widgets.DockArea;
import DockMode = phosphor.widgets.DockMode;
import Tab = phosphor.widgets.Tab;
import Widget = phosphor.widgets.Widget;
import Menu = phosphor.widgets.Menu;
import MenuBar = phosphor.widgets.MenuBar;
import MenuItem = phosphor.widgets.MenuItem;

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





function main(): void {

  var menubar = new MenuBar([
    newItem
  ]);

  menubar.attach( document.getElementById('container') );
}

window.onload = main;
