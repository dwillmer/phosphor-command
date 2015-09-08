/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IKeyboardManager
} from './keyboard_manager_interface';
import {
  IKeyPerm
} from './key_perm_interface';
import {
  ICommandInvoker
} from './command_invoker_interface';

import {
  Signal, ISignal
} from 'phosphor-signaling';

var MOZILLA_MODIFIERS = { '; :': 59, '= +': 61, '- _': 173, 'meta': 224, 'minus': 173 };
var IE_MODIFIERS = { '; :': 186, '= +': 187, '- _': 189, 'minus': 189 };


/**
 * A simple, concrete implementation of the keyboard manager interface.
 *
 * This takes a single argument 'keycodes', which should either be a string
 * 'mozilla' or 'ie', to represent which browser keycode system should be
 * used, or alternatively should be an object defining preferred 'keycode'
 * -> number maps to override the static keycodes defined below.
 *
 */
export
class KeyboardManager implements IKeyboardManager, ICommandInvoker {

  /**
   * A signal used to indicate to other parts of the application that the
   * critera have been met for a command to be invoked.
   *
   */
  static invokeCommandSignal = new Signal<KeyboardManager, string>();

  /**
   * These have been lifted directly from 
   * https://github.com/jupyter/notebook/blob/master/notebook/static/base/js/keyboard.js#L30
   *
   * We potentially have more than one Keyboard Manager in the app, so we 
   * don't want to store a copy of the keycodes list for each instance.
   */
  static keycodes = {
    'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73,
    'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82,
    's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,
    '1 !': 49, '2 @': 50, '3 #': 51, '4 $': 52, '5 %': 53, '6 ^': 54,
    '7 &': 55, '8 *': 56, '9 (': 57, '0 )': 48,
    '[ {': 219, '] }': 221, '` ~': 192, ', <': 188, '. >': 190, '/ ?': 191,
    '\\ |': 220, '\' "': 222,
    'numpad0': 96, 'numpad1': 97, 'numpad2': 98, 'numpad3': 99, 'numpad4': 100,
    'numpad5': 101, 'numpad6': 102, 'numpad7': 103, 'numpad8': 104, 'numpad9': 105,
    'multiply': 106, 'add': 107, 'subtract': 109, 'decimal': 110, 'divide': 111,
    'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118,
    'f8': 119, 'f9': 120, 'f11': 122, 'f12': 123, 'f13': 124, 'f14': 125, 'f15': 126,
    'backspace': 8, 'tab': 9, 'enter': 13, 'shift': 16, 'ctrl': 17, 'alt': 18,
    'meta': 91, 'capslock': 20, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34,
    'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40,
    'insert': 45, 'delete': 46, 'numlock': 144,
  };

  protected _keycode_modifications: any = {};

  private _key_perms: any = {};
  private _disabled: string[] = [];


  constructor(keycodes?: any) {

    if (keycodes === 'mozilla') {
      this._keycode_modifications = MOZILLA_MODIFIERS;
    } else if (keycodes === 'ie') {
      this._keycode_modifications = IE_MODIFIERS;
    } else if (keycodes !== undefined) {
      this._keycode_modifications = keycodes;
    }

    this._bindEvents();
  }

  /**
   * Getter for the external components to be able to bind to the
   * signal.
   */
  get invokeCommand(): ISignal<KeyboardManager, string> {
    return KeyboardManager.invokeCommandSignal.bind(this);
  }

  /**
   * Registers a key permutation with the keyboard manager.
   *
   * This is part of the IKeyboardManager interface.
   *
   */
  registerInput(key: IKeyPerm): boolean {
    if(key.input in this._key_perms) {
      return false;
    }
    this._key_perms[key.input] = key.command;
    return true;
  }

  /**
   * Enables a given key permutation.
   *
   * This is part of the IKeyboardManager interface.
   */ 
  enable(key: string): boolean {
    if(key in this._disabled) {
      delete this._disabled[key];
      return true;
    }
    return false;
  }

  /**
   * Disables a given key permutation.
   *
   * This is part of the IKeyboardManager interface.
   */
  disable(key: string): boolean {
    if(key in this._key_perms && !(key in this._disabled)) {
      this._disabled.push(key);
      return true;
    }
    return false;
  }

  /**
   * Unregisters a given key permutation.
   *
   * This is part of the IKeyboardManager interface.
   */
  unregister(key: string): boolean {
    if(key in this._key_perms) {
      delete this._key_perms[key];
      if(key in this._disabled) {
        delete this._disabled[key];
      }
      return true;
    }
    return false;
  }

  /**
   * Returns the numeric keycode from a string representing the key.
   * 
   * We want to minimise copies of the keycodes, so the main mapping 'keycodes'
   * is static, and the modifications usually just reference a global, unless 
   * there's custom modifications, in which case those are stored per instance.
   */
  private _getKeyCode(key: string): number {
    if(key in this._keycode_modifications) {
      return this._keycode_modifications[key];
    } else if(key in KeyboardManager.keycodes) {
      return KeyboardManager.keycodes[key];
    }
  }

  private _bindEvents(): void {
    var that = this;
    document.addEventListener("keydown", function(event: KeyboardEvent) {
      
      var key = <number>(event.keyCode);
      var isCtrl = <boolean>(event.ctrlKey);
      var ctrlCode = that._getKeyCode('ctrl');

      if( isCtrl ) {
        switch(key) {
          case ctrlCode:
            break;// ignore ctrl key.
          default:
            console.log('Invoking command');
            that.invokeCommand.emit("dock.new.codepanel");
        }
      }
    });
  }
}





