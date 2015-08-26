(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9jb21tYW5kLWFwcC9idWlsZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIFBob3NwaG9ySlMgQ29udHJpYnV0b3JzXG58XG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQlNEIDMtQ2xhdXNlIExpY2Vuc2UuXG58XG58IFRoZSBmdWxsIGxpY2Vuc2UgaXMgaW4gdGhlIGZpbGUgTElDRU5TRSwgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvZnR3YXJlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xuICAgIGQucHJvdG90eXBlID0gbmV3IF9fKCk7XG59O1xuLyppbXBvcnQge1xuICBEb2NrQXJlYSwgRG9ja01vZGUsIFRhYiwgV2lkZ2V0LFxuICBNZW51LCBNZW51QmFyLCBNZW51SXRlbVxufSBmcm9tIHBob3NwaG9yLndpZGdldHM7Ki9cbnZhciBjb25uZWN0ID0gcGhvc3Bob3IuY29yZS5jb25uZWN0O1xudmFyIFJlc2l6ZU1lc3NhZ2UgPSBwaG9zcGhvci53aWRnZXRzLlJlc2l6ZU1lc3NhZ2U7XG52YXIgRG9ja0FyZWEgPSBwaG9zcGhvci53aWRnZXRzLkRvY2tBcmVhO1xudmFyIERvY2tNb2RlID0gcGhvc3Bob3Iud2lkZ2V0cy5Eb2NrTW9kZTtcbnZhciBUYWIgPSBwaG9zcGhvci53aWRnZXRzLlRhYjtcbnZhciBXaWRnZXQgPSBwaG9zcGhvci53aWRnZXRzLldpZGdldDtcbnZhciBNZW51ID0gcGhvc3Bob3Iud2lkZ2V0cy5NZW51O1xudmFyIE1lbnVCYXIgPSBwaG9zcGhvci53aWRnZXRzLk1lbnVCYXI7XG52YXIgTWVudUl0ZW0gPSBwaG9zcGhvci53aWRnZXRzLk1lbnVJdGVtO1xudmFyIGRvY2thcmVhID0gbmV3IERvY2tBcmVhKCk7XG5kb2NrYXJlYS50YWJPdmVybGFwID0gMTtcbnZhciBoYW5kbGVyID0ge1xuICAgIG5ld0NvZGVQYW5lbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFuZWwgPSBuZXcgQ29kZU1pcnJvclRhYignQ29kZScpO1xuICAgICAgICBkb2NrYXJlYS5hZGRXaWRnZXQocGFuZWwsIERvY2tNb2RlLlJpZ2h0KTtcbiAgICAgICAgZG9ja2FyZWEuZml0KCk7XG4gICAgICAgIHBhbmVsLmZpdCgpO1xuICAgIH1cbn07XG4vKipcbiAqIENvZGVNaXJyb3Igd2lkZ2V0IC0gdXNlIGZyb20gc2VwYXJhdGUgd2lkZ2V0cyBkaXJlY3RvcnksIHdoZW4gYXZhaWFibGVcbiAqL1xudmFyIENvZGVNaXJyb3JUYWIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2RlTWlycm9yVGFiLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvZGVNaXJyb3JUYWIodGl0bGUsIGNvbmZpZykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnY29udGVudCcpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKHRpdGxlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB0aGlzLl90YWIgPSBuZXcgVGFiKHRpdGxlKTtcbiAgICAgICAgdGhpcy5fdGFiLmNsb3NhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY20gPSBDb2RlTWlycm9yKHRoaXMubm9kZSwgY29uZmlnKTtcbiAgICB9XG4gICAgQ29kZU1pcnJvclRhYi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY20gPSBudWxsO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2RlTWlycm9yVGFiLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQ29kZU1pcnJvclRhYi5wcm90b3R5cGUub25BZnRlckF0dGFjaCA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgdGhpcy5fY20ucmVmcmVzaCgpO1xuICAgIH07XG4gICAgQ29kZU1pcnJvclRhYi5wcm90b3R5cGUub25SZXNpemUgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIHRoaXMuX2NtLnNldFNpemUobXNnLndpZHRoLCBtc2cuaGVpZ2h0KTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2RlTWlycm9yVGFiLnByb3RvdHlwZSwgXCJ0YWJcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YWI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBDb2RlTWlycm9yVGFiO1xufSkoV2lkZ2V0KTtcbi8qKlxuICogSGFyZC1jb2RlZCBtZW51IGl0ZW0sIGZvciBub3cuXG4gKi9cbnZhciBhZGRDb2RlTWlycm9ySXRlbSA9IG5ldyBNZW51SXRlbSh7XG4gICAgdGV4dDogXCJOZXcgQ29kZSBQYW5lbFwiLFxuICAgIHNob3J0Y3V0OiBcIkN0cmwtTlwiXG59KTtcbmNvbm5lY3QoYWRkQ29kZU1pcnJvckl0ZW0sIE1lbnVJdGVtLnRyaWdnZXJlZCwgaGFuZGxlciwgaGFuZGxlci5uZXdDb2RlUGFuZWwpO1xudmFyIG5ld0l0ZW0gPSBuZXcgTWVudUl0ZW0oe1xuICAgIHRleHQ6IFwiTmV3XCIsXG4gICAgc3VibWVudTogbmV3IE1lbnUoW1xuICAgICAgICBhZGRDb2RlTWlycm9ySXRlbSxcbiAgICBdKSxcbn0pO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICB2YXIgaW5pdGlhbCA9IG5ldyBDb2RlTWlycm9yVGFiKCdDb2RlJyk7XG4gICAgZG9ja2FyZWEuYWRkV2lkZ2V0KGluaXRpYWwpO1xuICAgIGRvY2thcmVhLmZpdCgpO1xuICAgIHZhciBtZW51YmFyID0gbmV3IE1lbnVCYXIoW1xuICAgICAgICBuZXdJdGVtXG4gICAgXSk7XG4gICAgbWVudWJhci5hdHRhY2goZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpKTtcbiAgICBkb2NrYXJlYS5hdHRhY2goZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKSk7XG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9ja2FyZWEuZml0KCk7IH07XG59XG53aW5kb3cub25sb2FkID0gbWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdfQ==
