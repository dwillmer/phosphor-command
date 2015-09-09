/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/**
 * Formalises the behaviour required for a component to inform other
 * parts of an application that a new keyboard shortcut is available.
 *
 */
export
interface IShortcutAdder {
	shortcutAdded: any
}