(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlcy9jb21tYW5kLWFwcC9idWlsZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIFBob3NwaG9ySlMgQ29udHJpYnV0b3JzXG58XG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQlNEIDMtQ2xhdXNlIExpY2Vuc2UuXG58XG58IFRoZSBmdWxsIGxpY2Vuc2UgaXMgaW4gdGhlIGZpbGUgTElDRU5TRSwgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvZnR3YXJlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuJ3VzZSBzdHJpY3QnO1xuLyppbXBvcnQge1xuICBEb2NrQXJlYSwgRG9ja01vZGUsIFRhYiwgV2lkZ2V0LFxuICBNZW51LCBNZW51QmFyLCBNZW51SXRlbVxufSBmcm9tIHBob3NwaG9yLndpZGdldHM7Ki9cbnZhciBEb2NrQXJlYSA9IHBob3NwaG9yLndpZGdldHMuRG9ja0FyZWE7XG52YXIgRG9ja01vZGUgPSBwaG9zcGhvci53aWRnZXRzLkRvY2tNb2RlO1xudmFyIFRhYiA9IHBob3NwaG9yLndpZGdldHMuVGFiO1xudmFyIFdpZGdldCA9IHBob3NwaG9yLndpZGdldHMuV2lkZ2V0O1xudmFyIE1lbnUgPSBwaG9zcGhvci53aWRnZXRzLk1lbnU7XG52YXIgTWVudUJhciA9IHBob3NwaG9yLndpZGdldHMuTWVudUJhcjtcbnZhciBNZW51SXRlbSA9IHBob3NwaG9yLndpZGdldHMuTWVudUl0ZW07XG52YXIgYWRkQ29kZU1pcnJvckl0ZW0gPSBuZXcgTWVudUl0ZW0oe1xuICAgIHRleHQ6IFwiTmV3IENvZGUgUGFuZWxcIixcbiAgICBzaG9ydGN1dDogXCJDdHJsLU5cIlxufSk7XG52YXIgbmV3SXRlbSA9IG5ldyBNZW51SXRlbSh7XG4gICAgdGV4dDogXCJOZXdcIixcbiAgICBzdWJtZW51OiBuZXcgTWVudShbXG4gICAgICAgIGFkZENvZGVNaXJyb3JJdGVtLFxuICAgIF0pLFxufSk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHZhciBtZW51YmFyID0gbmV3IE1lbnVCYXIoW1xuICAgICAgICBuZXdJdGVtXG4gICAgXSk7XG4gICAgbWVudWJhci5hdHRhY2goZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpKTtcbn1cbndpbmRvdy5vbmxvYWQgPSBtYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl19
