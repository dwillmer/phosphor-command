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
 * stores the registered menu items, which are objects that conform to
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
 * Commands can either be invoked directly (runCommand) or via a Signal. In the
 * case of a Signal, the emitting component needs to (1) implement ICommandInvoker
 * and (2) register with the required CommandManager (registerCommandInvoker).
 * 
 */
export * from './commandinterface';
export * from './commandinvokerinterface';
export * from './commandmanager';
export * from './commandmanagerinterface';
export * from './constraints';
export * from './keysequenceinterface';
export * from './keyboardmanager';
export * from './keyboardmanagerinterface';
export * from './menuiteminterface';
export * from './menumanager';
export * from './menumanagerinterface';
export * from './menusolver';
export * from './shortcutadderinterface';




