/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  Message
} from 'phosphor-messaging';

import {
  ResizeMessage, Widget, attachWidget
} from 'phosphor-widget';

import {
  ISignal, Signal
} from 'phosphor-signaling';

import {
  ICommand, IMenuItem, CommandManager, KeyboardManager,
  MenuManager, MenuSolver
} from '../../../lib/index';

import {
  Menu, MenuItem, MenuBar
} from 'phosphor-menus';

import {
  Tab, TabPanel
} from 'phosphor-tabs';

import './index.css';


var COMM = new CommandManager();
var panel = new TabPanel();


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
    panel.addWidget(new CodeMirrorWidget('Code'));
  }
}


var newTesterPanelCommand = {
  id: "dock.new.testerpanel",
  handler: () => {
    panel.addWidget(new CommandTesterTab());
  }
}


COMM.registerCommand(newCodePanelCommand);
COMM.registerCommand(newTesterPanelCommand);


/**
 * CodeMirror widget - use from separate widgets directory, when avaiable
 */
class CodeMirrorWidget extends Widget {

  constructor(title: string, config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('content');
    this.addClass(title.toLowerCase());
    this._cm = CodeMirror( this.node, config );
    var tab = new Tab(title);
    tab.closable = true;
    TabPanel.setTab(this, tab);
  }

  dispose(): void {
    this._cm = null;
    super.dispose();
  }

  get editor(): CodeMirror.Editor {
    return this._cm;
  }

  protected onAfterAttach(msg: Message): void {
    this._cm.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    this._cm.setSize( msg.width, msg.height );
  }

  private _cm: CodeMirror.Editor;
}


/**
 * Command tester
 */
class CommandTesterTab extends Widget {

  constructor() {
    super();
    var tab = new Tab('Tester');
    TabPanel.setTab(this, tab);
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.name = 'newCodeButton';
    btn.value = "New Code Panel";
    btn.onclick = () => COMM.runCommand('dock.new.codepanel');
    this.node.appendChild(btn);
  }
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
  var initial = new CodeMirrorWidget('Code');
  panel.addWidget(initial);
  panel.addWidget(tester);

  var solver = new MenuSolver(menuManager);
  // var menubar = solver.solve();
  var menubar = new MenuBar();
  menubar.id = 'menubar';

  menubar.items = [
    editItem,
  ];

  panel.id = 'main';

  attachWidget(menubar, document.body);
  attachWidget(panel, document.body);

  window.onresize = () => panel.update();
}


window.onload = main;
