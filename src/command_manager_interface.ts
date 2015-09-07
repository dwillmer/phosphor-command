/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
	ICommand
} from './command_interface';


/**
 * The command manager stores the existing registered commands, and
 * can present information about the current commands to other parts
 * of the application.
 *
 * Instances of ICommandManager should not deal directly with other levels
 * in the application hierarchy, such as UI items, but should be able to
 * be called to give the current state.
 *
 */
export
interface ICommandManager {

	/**
	 * Registers a command with the manager, returns a boolean to confirm
	 * it registered correctly. 
	 *
	 * A false could indicate that a command with 
	 * that id is already registered - could perhaps do with a more nuanced 
	 * approach to failure here, rather than just using a boolean.
	 */
  registerCommand(command: ICommand): boolean;
  
  /**
   * Runs the handler associated with a command, takes a string.
   *
   * We don't return anything fancy here - if there's an error such as
   * the command doesn't exist, or the handler threw an error, we just
   * let it propagate normally.
	 */
  runCommand(name: string): void; // TODO : arguments for commands.
}
