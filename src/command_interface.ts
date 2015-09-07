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
export
interface ICommand {
  /**
   * 'id' is the developer identifier of this specific command.
   * It does not have to be human readable or user-friendly.
   *
   * This string is namespaced, so you can separate different parts of
   * the name with '.' characters to group the commands however you
   * see fit. This hierarchical naming may be useful for menu generation,
   * or may allow faster searching in a command-pallette-style search.
   */
  id: string;

  /**
   * The callable/function/closure representing the work to be performed
   * when this command is required.
   */
  handler: any;

  /**
   * (Optional) The main human-readable, user-presentable string to denote the
   * functionality of this command
   */
  title?: string;

  /**
   * (Optional) A longer description of this command, useful for displaying in the UI
   * when searching, or for performing searching on itself, for example.
   *
   */
  description?: string;
}
