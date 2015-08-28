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
  MenuSolver, IMenuManager, IMenuItem
} from "../../lib/index";
import MenuBar = phosphor.widgets.MenuBar;


class SimpleTestManager implements IMenuManager {
  registerMenuItem( item: IMenuItem ): boolean { return true; }

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

      describe('.solve()', () => {

        it('should return a MenuBar with a single item "File"', () => {
          var manager = new SimpleTestManager();
          var solver = new MenuSolver( manager );
          var result = solver.solve();

          expect(result.count).to.be(1);
          expect(result.itemAt(0).text).to.be("File");
        });

      }); //describe .solve()

    }); // describe MenuSolver
}) // describe phosphor-command
