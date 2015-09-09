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

import {
  attachWidget
} from 'phosphor-widget';
import {
  ISignal, Signal
} from 'phosphor-signaling';

import {
  ICommand, IMenuItem, CommandManager, KeyboardManager,
  MenuManager, MenuSolver
} from "../../../lib/index";

import {
  Menu, MenuItem, MenuBar
} from 'phosphor-menus';

// import './index.css';


var COMM = new CommandManager();
var dockarea = new DockArea();
dockarea.tabOverlap = 1;


var MENU = [
  {
    "location": ["New", "Code Panel"],
    "command": "dock.new.codepanel",
    "shortcut": ["Ctrl", "P"],
    "short_desc": "Code Panel",
    "long_desc": "Adds a new Dock item with a Codemirror widget."
  },
  {
    "location": ["New", "Tester Panel"],
    "command": "dock.new.testerpanel",
    "shortcut": ["Ctrl", "T"]
  },
  {
    "location": ["New", "Example", "One"],
    "command": "example.namespace.one"
  },
  {
    "location": ["New", "Example", "Two"],
    "command": "example.namespace.two"
  },
  {
    "location": ["Edit", "Undo"],
    "command": "global.edit.undo"
  },
  {
    "location": ["Edit", "Redo"],
    "command": "global.edit.redo"
  }
];


var newCodePanelCommand = {
  id: "dock.new.codepanel",
  handler: () => {
    var panel = new CodeMirrorTab('Code');
    dockarea.addWidget(panel, DockMode.Right);
    dockarea.fit();
  }
}

var newTesterPanelCommand = {
  id: "dock.new.testerpanel",
  handler: () => {
    var panel = new CommandTesterTab();
    dockarea.addWidget(panel, DockMode.Right);
    dockarea.fit();
  }
}

COMM.registerCommand(newCodePanelCommand);
COMM.registerCommand(newTesterPanelCommand);




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
 * Command tester
 *
 */
class CommandTesterTab extends Widget {
  constructor() {
    super();
    this._tab = new Tab('Tester');
    this._tab.closable = true;
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.name = 'newCodeButton';
    btn.value = "New Code Panel";
    btn.onclick = () => COMM.runCommand('dock.new.codepanel');
    this.node.appendChild( btn );
  }

  get tab(): Tab {
    return this._tab;
  }

  private _tab: Tab;
}


//
// Demo test menu bar
//
//

var undoItem = new MenuItem({
  text: 'Undo'
});
var redoItem = new MenuItem({
  text: 'Redo'
});
var editMenu = new Menu();
editMenu.items = [
  undoItem,
  redoItem,
];
var editItem = new MenuItem({
  text: 'Edit',
  submenu: editMenu
});






function main(): void {

  var menuManager = new MenuManager(MENU);
  //COMM.registerCommandInvoker(menuManager);

  var keyManager = new KeyboardManager('mozilla');
  COMM.registerCommandInvoker(keyManager);

  keyManager.registerShortcutAdder(menuManager);
  menuManager.registerShortcuts();

  var tester = new CommandTesterTab();
  var initial = new CodeMirrorTab('Code');
  dockarea.addWidget(initial);
  dockarea.addWidget(tester);
  dockarea.fit();

  var solver = new MenuSolver(menuManager);
  // var menubar = solver.solve();
  var menubar = new MenuBar();
  menubar.items = [
    editItem,
  ];

  //attachWidget(menubar, document.getElementById('container'));
  attachWidget(menubar, document.body);
  dockarea.attach( document.getElementById('main') );

  window.onresize = () => dockarea.fit();
  dockarea.fit();
}

window.onload = main;
