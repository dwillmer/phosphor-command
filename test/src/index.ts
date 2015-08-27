/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';


import expect = require('expect.js');

import {
  MenuSolver, IMenuManager
} from "../../lib/index";


class TestManager implements IMenuManager {
  allMenuItems(): any[] {
    return [
      {
        location: ["File", "New", "Window"],
        command: "file.new.window"
      },
      {
        location: ["File", "New", "Tab"],
        command: "file.new.tab"
      },
      {
        location: ["File", "New", "Document"],
        command: "file.new.document"
      }
    ]
  }
}


describe('phosphor-command', () => {

    describe('MenuSolver', () => {

      describe('')


    }); // describe MenuSolver
}) // describe phosphor-command
