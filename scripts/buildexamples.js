/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var dive = require('dive');
require('shelljs/global');

dive(
  process.cwd() + '/examples',
  { directories: true, recursive: false, files: false },
  function(err, dir) {
    mkdir('-p', dir + '/build');
    exec("stylus " + dir + "/src/index.styl -o " + dir + "/build");
    exec("tsc --project " + dir);
    exec("browserify " + dir + "/build/index.js --outfile " + dir + "/build/app.js --debug -g browserify-css");
  }
);
