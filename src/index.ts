/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/**
 * The basic details needed for a new command.
 *
 * A 'command' in this context is an action to be performed
 * at a later point in time. We use the same terminology here
 * as WPF and Github's Atom editor. There are no UI items
 * specifically related to a 'command', a 'command' is simply a collection
 * of items which have sufficient knowledge to perform an action
 * at a later time.
 *
 * The UI items are created and used elsewhere in the application -
 * for example, one component may generate the menubar at the top
 * of the application from the registered commands which are (1)
 * in scope, and (2) have menu information present.
 *
 *
 */
interface ICommand {
  /*
   * 'name' is the developer id of this specific command.
   * It does not have to be human readable or user-friendly.
   */
  name: string,
  callable: any,
  short_desc: string,
  long_desc: string,
  shortcut: string,
  menu_location?: string
}

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
interface ICommandManager {
  registerCommand( command: ICommand ): boolean;
}
