/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/**
 * Formalises the behaviour required for a component to invoke 
 * commands across the rest of the application.
 *
 * The invoke command property should return a bound phosphor signal,
 * the type signature will vary as it is templated on class type.
 */
export
interface ICommandInvoker {
	invokeCommand: any
}