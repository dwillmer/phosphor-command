/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*import {
  DockArea, DockMode, Tab, Widget,
  Menu, MenuBar, MenuItem
} from phosphor.widgets;*/
var connect = phosphor.core.connect;
var ResizeMessage = phosphor.widgets.ResizeMessage;
var DockArea = phosphor.widgets.DockArea;
var DockMode = phosphor.widgets.DockMode;
var Tab = phosphor.widgets.Tab;
var Widget = phosphor.widgets.Widget;
var Menu = phosphor.widgets.Menu;
var MenuBar = phosphor.widgets.MenuBar;
var MenuItem = phosphor.widgets.MenuItem;
var dockarea = new DockArea();
dockarea.tabOverlap = 1;
var handler = {
    newCodePanel: function () {
        var panel = new CodeMirrorTab('Code');
        dockarea.addWidget(panel, DockMode.Right);
        dockarea.fit();
        panel.fit();
    }
};
/**
 * CodeMirror widget - use from separate widgets directory, when avaiable
 */
var CodeMirrorTab = (function (_super) {
    __extends(CodeMirrorTab, _super);
    function CodeMirrorTab(title, config) {
        _super.call(this);
        this.addClass('content');
        this.addClass(title.toLowerCase());
        this._tab = new Tab(title);
        this._tab.closable = true;
        this._cm = CodeMirror(this.node, config);
    }
    CodeMirrorTab.prototype.dispose = function () {
        this._cm = null;
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(CodeMirrorTab.prototype, "editor", {
        get: function () {
            return this._cm;
        },
        enumerable: true,
        configurable: true
    });
    CodeMirrorTab.prototype.onAfterAttach = function (msg) {
        this._cm.refresh();
    };
    CodeMirrorTab.prototype.onResize = function (msg) {
        this._cm.setSize(msg.width, msg.height);
    };
    Object.defineProperty(CodeMirrorTab.prototype, "tab", {
        get: function () {
            return this._tab;
        },
        enumerable: true,
        configurable: true
    });
    return CodeMirrorTab;
})(Widget);
/**
 * Hard-coded menu item, for now.
 */
var addCodeMirrorItem = new MenuItem({
    text: "New Code Panel",
    shortcut: "Ctrl-N"
});
connect(addCodeMirrorItem, MenuItem.triggered, handler, handler.newCodePanel);
var newItem = new MenuItem({
    text: "New",
    submenu: new Menu([
        addCodeMirrorItem,
    ]),
});
function main() {
    var initial = new CodeMirrorTab('Code');
    dockarea.addWidget(initial);
    dockarea.fit();
    var menubar = new MenuBar([
        newItem
    ]);
    menubar.attach(document.getElementById('container'));
    dockarea.attach(document.getElementById('main'));
    window.onresize = function () { return dockarea.fit(); };
}
window.onload = main;
//# sourceMappingURL=index.js.map