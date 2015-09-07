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


/**
 * A simple, concrete implementation of the keyboard manager interface.
 *
 * 
 *
 */
export
class KeyboardManager implements IKeyboardManager {

  private _key_perms: any = {};
  private _disabled: string[] = [];

  /**
   * These have been lifted directly from 
   * https://github.com/jupyter/notebook/blob/master/notebook/static/base/js/keyboard.js#L30
   */
  static _keycodes: any = {
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

  constructor() {}

  /**
   * Registers a key permutation with the keyboard manager
   *
   * This is part of the IKeyboardManager interface.
   *
   */
  registerInput(key: IKeyPerm): boolean {

  }

  /**
   * Enables a given key permutation.
   *
   * This is part of the IKeyboardManager interface.
   */ 
  enable(key: string): boolean {

  }

  /**
   * Disables a given key permutation.
   *
   * This is part of the IKeyboardManager interface.
   */
  disable(key: string): boolean {

  }

  /**
   * Unregisters a given key permutation.
   *
   * This is part of the IKeyboardManager interface.
   */
  unregister(key: string): boolean {

  }
}
