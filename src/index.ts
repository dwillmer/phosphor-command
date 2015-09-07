/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/**
 *     ______________
 *    |              |
 * -->|  MenuManager |-|------------------------.
 *    |______________| |                        |  ________________               
 *                     |                        |-|                |
 *                     |  _________________       | CommandManager |
 *                     |-|                 |    |-|________________|
 *                       | KeyboardManager |----|
 *                    -->|_________________|
 *
 * MenuManager - 
 * stores the registered menu items, defined with objects which conform to
 * IMenuItem. This presents the registered menu items to any view components
 * which need the data, eg. the solver in order to build a menu hierarchy.
 *
 * KeyboardManager - 
 * stores the key permutations which result in command handlers being invoked.
 * this is populated directly, or indirectly via the menu manager. When a menu
 * shortcut is defined in a registered menu item, the menu manager passes the 
 * key permutation to the keyboard manager to register it as valid.
 *
 * CommandManager - 
 * stores the id's and handlers for the registered commands, and executes the 
 * handler if requested. 
 * 
 */

export * from './command_interface';
export * from './command_manager';
export * from './command_manager_interface';
export * from './constraints';
export * from './key_perm_interface';
export * from './keyboard_manager';
export * from './keyboard_manager_interface';
export * from './menu_item_interface';
export * from './menu_manager_interface';
export * from './menu_solver';




