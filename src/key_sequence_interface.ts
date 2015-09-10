/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/**
 * The basic details needed for a keyboard shortcut.
 *
 * Keyboard shortcuts are treated as permutations, not
 * combinations, because order is important. We may want to
 * support emacs/vi-style user commands, and therefore need
 * to differentiate between key orderings.
 *
 * In a number of common cases, instances conforming to IKeySequence
 * will be created by the MenuManager, ie. when shortcuts are declared in
 * the menu items.
 *
 * However, we don't want to solely use the menu manager as the way of 
 * registering commands on keyboard input, because the menus may need to
 * be changed based on program execution (eg. context menus), and we may
 * still want other non-menu key combinations to work.
 *
 * In these cases, you canregister an IKeySequence-conforming object with a keyboard
 * manager, and not through a menu manager.
 */
export
interface IKeySequence {
  
  /**
   * A string representing the specific user input that should trigger the
   * command to be executed.
   * 
   * #### Examples
   * ```typescript
   * 'Ctrl-X'
   * 'Shift-Ctrl-4';
   * ```
   * TODO : convert this to a string array so all joining is only dealt
   * with inside a single class.
   */
  input: string;

  /**
   * A string denoting the name of the command to be executed when a specific
   * key permutation is entered.
   *
   * The command should already have been registered before registering this 
   * key permutation.
   */
  command: string;
}
