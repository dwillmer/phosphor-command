/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  ICommandManager
} from './command_manager_interface';
import {
  ICommand
} from './command_interface';


/**
 * A simple, concrete implementation of the command manager interface.
 *
 * This stores the mapping of id -> ICommand object in the private _commandMap
 * variable.
 *
 * #### Example
 * ```typescript
 * var cm = CommandManager();
 * myCommand = {id: 'my.test', handler: () => {console.log('test');} };
 * cm.registerCommand(myCommand);
 * cm.runCommand('my.test');
 * ```
 *
 * #### Notes
 *
 * TODO : 
 * - searching by namespace
 * - command arguments / execution scope
 */
export
class CommandManager implements ICommandManager {
  constructor() {}

  /**
   * Registers a command in the internal map
   *
   * This is part of the ICommandManager interface, it takes any
   * object which implements ICommand.
   */
  registerCommand(command: ICommand): boolean {
    this._commandMap[command.id] = command;
    this._addToNamespaces(command.id);
    return true;
  }

  /**
   * Runs the handler associated with a command id.
   *
   * This is part of the ICommandManager interface, it takes a string
   * which represents the full id of a pre-registered command.
   */
  runCommand(id: string): void {
    var command = this._commandMap[id];
    command.handler();
  }

  _addToNamespaces(id: string): void {
    id.split('.'); // TODO
  }

  private _commandMap: any = {};
  private _namespaces: string[]; // TODO: should be a set, not array;

}
