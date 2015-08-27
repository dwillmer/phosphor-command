/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

export
interface IConstraint {
  constrain( against: string ): string[];
}

export
class Before implements IConstraint {
  constructor( private val: string ) {}
  constrain( against: string ): string[] {
    return [this.val, against];
  }
}

export
class After implements IConstraint {
  constructor( private val: string ) {}
  constrain( against: string ): string[] {
    return [against, this.val];
  }
}
