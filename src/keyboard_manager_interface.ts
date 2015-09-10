/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IKeySequence
} from './key_sequence_interface';
import {
  IMenuManager
} from './menu_manager_interface';
import {
  IShortcutAdder
} from './shortcut_adder_interface';


/**
 * A keyboard manager stores all permutations of registered keyboard inputs
 * and maps them to the name of a command to be invoked.
 *
 * This can be partially or completely populated by one or more MenuManagers,
 * and should receive enable/disable/dispose events from registered menu managers
 * as the required menu items/shortcuts change based on program context.
 */
export
interface IKeyboardManager {

  /**
   * Registers an IKeySequence with the manager, returns a boolean to confirm
   * it registered correctly. 
   *
   * A false could indicate that the key permutation is already 
   * registered - we could perhaps do with a more nuanced 
   * approach to failure here, rather than just using a boolean.
   */
  registerInput(key: IKeySequence): boolean;
  
  /**
   * Enables an already registered key permutation given by the input string.
   *
   * Returns boolean true to confirm the item is now enabled. Will return false
   * if, for example, the given key string has not previously been registered 
   */
  enable(key: string): boolean;

  /**
   * Disables an already registered key permutation given by the input string.
   *
   * Returns boolean true to confirm the item is now disable. Will return false
   * if, for example, the given key string has not previously been registered.
   */
  disable(key: string): boolean;

  /**
   * Disposes of an already-registered key permutation.
   *
   * This completely removes the ability to use the given keyboard command
   * registered under 'key'.
   */
  unregister(key: string): boolean;

  /**
   * TODO!
   */
  registerShortcutAdder(obj: IShortcutAdder): boolean;

}
