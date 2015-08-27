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
   * 'name' is the developer id of this specific command.
   * It does not have to be human readable or user-friendly.
   *
   * This string is namespaced, so you can separate different parts of
   * the name with '.' characters to group the commands however you
   * see fit. This hierarchical naming may be useful for menu generation,
   * or may allow faster searching in a command-pallette-style search.
   */
  name: string,

  /**
   * The callable/function/closure representing the work to be performed
   * when this command is required.
   */
  callable: any,

  /**
   * An (optional) short description of what this command does.
   * This could be used to populate the text on the menu item, for example, if
   * the command is to be used through a UI menu bar.
   */
  short_desc?: string,

  /**
   * An (optional) long description of what this command does.
   * This could be used in tooltips / command palettes, or just for
   * general fuzzy search, to give more relevant terms.
   */
  long_desc?: string,

  /**
   * An (optional) string denoting the shortcut for this specific command.
   * In the case of a command to be shown in a menu, this could
   * be something like 'Ctrl-Shift-T'
   */
  shortcut?: string,

  /**
   * This is a menubar-specific array of strings to denote the location
   * in the menu hierarchy where this command should be placed.
   */
  menu_location?: string[]

  /**
   * Menu constraints are lists of items which denote the position of
   * a given menu item in each 1-D list.
   *
   * This is slightly more complex than most people expect, as we need
   * to solve the menu order for any item with child items, so you can
   * define constraints for any level in the hierarchy.
   *
   * For example, if the menu location above was ["New", "Tab", "Code Panel"],
   * your constraints could be
   * {
   *  "Code Panel" : [Before("Console"), After("Word Document")],
   *  "Tab" : [After("Window")]
   * }
   * You should not *have* to implement a constraint for every level in the
   * location, but that is implementation-specific.
   *
   */
  menu_constraints?: any
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
export
interface ICommandManager {
  registerCommand( command: ICommand ): boolean;

  runCommand( name: string ): void; // TODO : arguments for commands.

}
