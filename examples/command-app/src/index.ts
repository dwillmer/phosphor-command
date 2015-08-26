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

import connect = phosphor.core.connect;
import IMessage = phosphor.core.IMessage;
import ResizeMessage = phosphor.widgets.ResizeMessage;
import DockArea = phosphor.widgets.DockArea;
import DockMode = phosphor.widgets.DockMode;
import Tab = phosphor.widgets.Tab;
import Widget = phosphor.widgets.Widget;
import Menu = phosphor.widgets.Menu;
import MenuBar = phosphor.widgets.MenuBar;
import MenuItem = phosphor.widgets.MenuItem;



var dockarea = new DockArea();
dockarea.tabOverlap = 1;

var handler = {
  newCodePanel: () => {
    var panel = new CodeMirrorTab('Code');
    dockarea.addWidget( panel, DockMode.Right );
    dockarea.fit();
    panel.fit();
  }
}



/**
 * CodeMirror widget - use from separate widgets directory, when avaiable
 */
class CodeMirrorTab extends Widget {
  constructor(title: string, config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('content');
    this.addClass(title.toLowerCase());
    this._tab = new Tab(title);
    this._tab.closable = true;

    this._cm = CodeMirror( this.node, config );
  }

  dispose(): void {
    this._cm = null;
    super.dispose();
  }

  get editor(): CodeMirror.Editor {
    return this._cm;
  }

  protected onAfterAttach( msg: IMessage ): void {
    this._cm.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    this._cm.setSize( msg.width, msg.height );
  }

  get tab(): Tab {
    return this._tab;
  }

  private _tab: Tab;
  private _cm: CodeMirror.Editor;
}



/**
 * Hard-coded menu item, for now.
 */
var addCodeMirrorItem = new MenuItem({
  text: "New Code Panel",
  shortcut: "Ctrl-N"
});
connect( addCodeMirrorItem, MenuItem.triggered, handler, handler.newCodePanel );

var newItem = new MenuItem({
  text: "New",
  submenu: new Menu([
    addCodeMirrorItem,
  ]),
});


function main(): void {



  var initial = new CodeMirrorTab('Code');
  dockarea.addWidget(initial);
  dockarea.fit();

  var menubar = new MenuBar([
    newItem
  ]);

  menubar.attach( document.getElementById('container') );
  dockarea.attach( document.getElementById('main') );

  window.onresize = () => dockarea.fit();
}

window.onload = main;
