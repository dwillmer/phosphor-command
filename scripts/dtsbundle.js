/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
require('dts-generator').generate({
  name: 'phosphor-command',
  main: 'phosphor-command/index',
  baseDir: 'lib',
  files: ['index.d.ts'],
  out: 'lib/phosphor-command.d.ts',
});
